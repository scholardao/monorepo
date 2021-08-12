pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DAO {
    enum PublicationStage {
        Draft,
        Preprint,
        Published
    }

    enum ReviewerDecision {
        Accept,
        MinorRevision,
        MajorRevision,
        Reject
    }

    enum ValidatorDecision {
        Accept,
        Reject,
        RequestRevision
    }

    enum IdentityVerificationModes {
        Twitter
    }

    struct Scholar {
        address payable scholarAddress;
        string name;
        bool verification;
        string[] fields;
        string[] subFields;
    }

    struct Validator {
        address payable validatorAddress;
        string name;
        bool verification;
        address scholarAddress;
        string[] fields;
        string[] subFields;
    }

    struct PaperStruct {
        uint256 id;
        string tokenURI;
        string title;
        address payable owner;
        address payable author;
        // address payable[] authors;
        // address payable beneficiary;
        address payable validator;
        address payable[] peerReviewers;
        string[] fields;
        string[] subFields;
        uint256[] citationsUsed;
        uint256 validatorTip;
        uint256 deadline;
        PublicationStage stage;
        // mapping(address => uint256) sponsorAmounts;
        uint256 amountRaised;
    }

    struct Review {
        uint256 paperId;
        address payable reviewerId;
        ReviewerDecision reviewerDecision;
        string commentsCid;
    }
    mapping(uint256 => PaperStruct) public paperById;
    mapping(address => Scholar) public scholarByAddress;
    mapping(address => Validator) public validatorByAddress;
    mapping(address => bool) public isValidator;
    mapping(address => bool) public isScholar;
    mapping(address => bool) public isVerifiedScholar;
    string[] public fields;
    mapping(string => string[]) public subFields;
    mapping(address => uint256) validatorCollateral;
    mapping(address => mapping(uint256 => bool)) public validatorRequests;
    mapping(address => mapping(uint256 => uint256)) public validatorResponseDeadline;
    mapping(address => mapping(uint256 => Review[])) public reviews;
    mapping(address => mapping(uint256 => uint256)) public sponsorAmounts;

    event PaperCreated(
        uint256 id,
        string tokenURI,
        address payable owner,
        address payable author,
        uint256[] citationsUsed,
        uint256 validatorTip
    );
    event ReviewAdded(
        uint256 tokenId,
        address reviewer,
        string commentCid,
        ReviewerDecision reviewerDecision
    );
    event Validated(uint256 tokenId, ValidatorDecision vDes);
    event ValidationRequestSent(uint256 _tokenId, address _validatorAddress);
    event ValidatorResponseSent(
        uint256 _tokenId,
        address _validatorAddress,
        uint256 _deadline
    );
    event ValidatorConfirmed(
        uint256 _tokenId,
        address _validator,
        uint256 _deadline
    );

    constructor() {
        fields = [
            "Computer Science",
            "Mathematics",
            "Physics",
            "Chemistry",
            "Life Sciences"
        ];
        subFields["Computer Science"] = [
            "Theory of computation",
            "Information and coding theory",
            "Data structures and algorithms",
            "Programming language theory and formal methods",
            "Artificial intelligence",
            "Game Theory",
            "Computer architecture and organization",
            "Concurrent, parallel and distributed computing",
            "Computer networks",
            "Computer security and cryptography",
            "Databases and data mining",
            "Computer graphics and visualization",
            "Image and sound processing",
            "Computational science, finance and engineering",
            "Social computing and human computer interaction",
            "Software engineering"
        ];
    }

    function verifyScholarProfile(
        string memory _name,
        string[] memory _fields,
        string[] memory _subFields,
        string memory _tweetUrl
    ) public returns (bool) {
        require(!isVerifiedScholar[msg.sender], "already verified");
        // check if LINK was sent as gas
        // send request to chainlink oracle with tweet url and msg.sender
        // returns verified or not
        Scholar memory s = Scholar(
            payable(msg.sender),
            _name,
            true,
            _fields,
            _subFields
        );
        scholarByAddress[msg.sender] = s;
        isVerifiedScholar[msg.sender] = true;

        return true;
    }

    function verifyValidatorProfile(
        string memory _name,
        address _scholarAddress,
        string[] memory _fields,
        string[] memory _subFields,
        string memory _tweetUrl,
        uint256 _collateral
    ) public payable returns (bool) {
        require(!isValidator[msg.sender], "already verified");
        // check if LINK was sent as gas
        // send request to chainlink oracle with tweet url and msg.sender
        // returns verified or not
        Validator memory v = Validator(
            payable(msg.sender),
            _name,
            true,
            _scholarAddress,
            _fields,
            _subFields
        );
        validatorByAddress[msg.sender] = v;
        isValidator[msg.sender] = true;
        validatorCollateral[msg.sender] = _collateral;
        return true;
    }
}
