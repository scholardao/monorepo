pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

// SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./DAO.sol";

contract Paper is ERC721, DAO {
    using Counters for Counters.Counter;
    Counters.Counter private paperId;

    // mapping(uint256 => mapping(address => uint256)) paperSponsorAmounts;

    constructor(string memory _tokenName, string memory _tokenSymbol)
        ERC721(_tokenName, _tokenSymbol)
    public    {}

    function submitDraft(
        string memory _title,
        // address payable[] memory _authors,
        string memory _tokenURI,
        string[] memory _fields,
        string[] memory _subFields,
        uint256[] memory _citationsUsed,
        uint256 _validatorTip,
        address payable[] memory _validatorAddresses
    ) public payable returns (uint256) {
        require(msg.value == _validatorTip, "specified validatorTip not sent");
        if (!isScholar[msg.sender]) {
            isScholar[msg.sender] = true;
        }
        paperId.increment();
        uint256 newPaperId = paperId.current();
        address payable _owner = payable(msg.sender);
        address payable _author = payable(msg.sender);
        address payable _validator;
        address payable[] memory _peerReviewers;
        // mapping(address => uint256) storage sa = paperSponsorAmounts[
        //     newPaperId
        // ];
        PaperStruct memory paper = PaperStruct(
            newPaperId,
            _tokenURI,
            _title,
            _owner,
            _author,
            // _authors,
            // _beneficiary,
            _validator,
            _peerReviewers,
            _fields,
            _subFields,
            _citationsUsed,
            _validatorTip,
            block.timestamp + 6 weeks, // default deadline
            PublicationStage.Draft,
            // sa,
            0
        );

        _safeMint(_owner, newPaperId);
        _setTokenURI(newPaperId, _tokenURI);

        // // adds categories
        // // since mappings already have values, every fields already has every subfields already. for example for subCategories['Computer'] every imaginable subfields mapping value already exists, we can push to it.
        // bool CategoryExists = false;
        // for (uint256 i = 0; i < fields.length; i++) {
        //     if (
        //         keccak256(abi.encodePacked((fields[i]))) ==
        //         keccak256(abi.encodePacked((_fields)))
        //     ) {
        //         CategoryExists = true;
        //     }
        // }
        // if (CategoryExists == false) {
        //     fields.push(_fields);
        // }

        // updates mapping
        paperById[newPaperId] = paper;
        emit PaperCreated(
            newPaperId,
            _tokenURI,
            // _title,
            _owner,
            _author,
            // _authors,
            // _fields,
            // _subFields,
            _citationsUsed,
            _validatorTip
        );

        // send validationRequest
        for (uint256 i = 0; i < _validatorAddresses.length; i++) {
            require(isValidator[_validatorAddresses[i]], "not a validator");
        }
        require(
            paperById[newPaperId].stage == PublicationStage.Draft,
            "cannot send validation request at this stage."
        );

        for (uint256 i = 0; i < _validatorAddresses.length; i++) {
            validatorRequests[_validatorAddresses[i]][newPaperId] = true;
            emit ValidationRequestSent(newPaperId, _validatorAddresses[i]);
        }

        return newPaperId;
    }

    function requestValidation(
        uint256 _tokenId,
        address payable[] memory _validatorAddresses
    ) public {
        require(_tokenId <= paperId.current(), "no such paper");
        require(
            msg.sender == paperById[_tokenId].owner,
            "only owner can send request"
        );
        require(
            paperById[_tokenId].validator == address(0),
            "validator already assigned"
        );
        for (uint256 i = 0; i < _validatorAddresses.length; i++) {
            require(isValidator[_validatorAddresses[i]], "not a validator");
        }
        require(
            paperById[_tokenId].stage == PublicationStage.Draft,
            "cannot send validation request at this stage."
        );

        for (uint256 i = 0; i < _validatorAddresses.length; i++) {
            validatorRequests[_validatorAddresses[i]][_tokenId] = true;
            emit ValidationRequestSent(_tokenId, _validatorAddresses[i]);
        }
    }

    function acceptValidationRequest(uint256 _tokenId, uint256 _deadline)
        public
        returns (uint256)
    {
        require(
            isValidator[msg.sender] == true,
            "sender should be a validator"
        );
        require(_tokenId <= paperId.current(), "no such paper");
        require(
            validatorRequests[msg.sender][_tokenId] == true,
            "no validatorRequest"
        );
        // TODO: check if validator field matches with paper field
        // require(validatorFields[_validator].length != 0, " not a validator ");
        require(
            paperById[_tokenId].validator == address(0),
            "validator already assigned"
        );
        require(
            paperById[_tokenId].stage == PublicationStage.Draft,
            "cannot assign validator at this stage."
        );

        validatorResponseDeadline[msg.sender][_tokenId] = _deadline;
        emit ValidatorResponseSent(_tokenId, msg.sender, _deadline);
        return (_deadline);
    }

    function selectValidator(uint256 _tokenId, address payable _validator)
        public
        returns (bool)
    {
        require(_tokenId <= paperId.current(), "no such paper");
        require(msg.sender == paperById[_tokenId].owner, "not the owner");
        require(
            validatorRequests[_validator][_tokenId] == true,
            "you didn't send a request to this validator"
        );
        require(
            validatorResponseDeadline[_validator][_tokenId] != 0,
            "validator didn't send response"
        );
        paperById[_tokenId].validator = _validator;
        paperById[_tokenId].deadline = validatorResponseDeadline[_validator][
            _tokenId
        ];
        paperById[_tokenId].stage = PublicationStage.Preprint;
        emit ValidatorConfirmed(
            _tokenId,
            _validator,
            validatorResponseDeadline[_validator][_tokenId]
        );
        return true;
    }

    function review(
        uint256 _tokenId,
        address payable _reviewer,
        ReviewerDecision _decision,
        string memory _commentsCid
    ) public {
        require(_tokenId <= paperId.current(), "no such paper");
        require(
            paperById[_tokenId].stage == PublicationStage.Preprint,
            "cannot review at this stage"
        );
        require(
            isVerifiedScholar[_reviewer] == true,
            "Please verify your address to start reviewing papers"
        );
        Scholar memory rvwr = scholarByAddress[_reviewer];
        bool allowed = false;
        for (uint256 i = 0; i < rvwr.fields.length; i++) {
            for (uint256 j = 0; j < paperById[_tokenId].fields.length; j++) {
                if (
                    keccak256(abi.encodePacked((rvwr.fields[i]))) ==
                    keccak256(abi.encodePacked((paperById[_tokenId].fields[j])))
                ) {
                    allowed = true;
                }
            }
        }
        require(
            allowed == true,
            "your research field is different from this paper"
        );
        Review memory rvw = Review(
            _tokenId,
            _reviewer,
            _decision,
            _commentsCid
        );
        reviews[_reviewer][_tokenId].push(rvw);
        paperById[_tokenId].peerReviewers.push(_reviewer);

        emit ReviewAdded(_tokenId, _reviewer, _commentsCid, _decision);
    }

    function submitValidatorDecision(uint256 _tokenId, ValidatorDecision _decision)
        public
    {
        require(
            isValidator[msg.sender] == true,
            "sender should be a validator"
        );
        require(_tokenId <= paperId.current(), "no such paper");
        require(
            paperById[_tokenId].validator == msg.sender,
            "you are not the validator assigned to this paper"
        );
        require(
            paperById[_tokenId].stage == PublicationStage.Preprint,
            "cannot submit validator decision at this stage."
        );
        if (_decision ==ValidatorDecision.Accept) {
            paperById[_tokenId].stage = PublicationStage.Published;
            emit Accepted(_tokenId);
        } else if (_decision ==ValidatorDecision.Reject) {
            paperById[_tokenId].stage = PublicationStage.Draft;
            paperById[_tokenId].validator = address(0);
        }
        emit Validated(_tokenId, _decision);
    }

    function sellPaper(uint256 _tokenId, address _buyer) public {
        require(_tokenId <= paperId.current(), "no such paper");
        require(
            msg.sender == paperById[_tokenId].owner,
            "only owner can sell the paper"
        );
        require(
            paperById[_tokenId].stage == PublicationStage.Published,
            "not published"
        );
        safeTransferFrom(msg.sender, _buyer, _tokenId);
    }

    function sponsorPaper(uint256 _tokenId) public payable {
        require(_tokenId <= paperId.current(), "no such paper");
        require(
            paperById[_tokenId].stage != PublicationStage.Published,
            "cannot sponsor at this stage"
        );
        sponsorAmounts[msg.sender][_tokenId] += msg.value;
        // paperById[_tokenId].sponsorAmounts[msg.sender] += msg.value;
        paperById[_tokenId].amountRaised += msg.value;
    }
}
