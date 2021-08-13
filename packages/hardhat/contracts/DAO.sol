pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

// SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract DAO is ChainlinkClient{
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
    
    address oracle = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
    uint256 fee = 0.1 * 10 ** 18;
    bool public data;
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

    constructor() public {
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
    
    function addressToString(address _address) public pure returns (string memory _uintAsString) {
          uint _i = uint256(_address);
          if (_i == 0) {
              return "0";
          }
          uint j = _i;
          uint len;
          while (j != 0) {
              len++;
              j /= 10;
          }
          bytes memory bstr = new bytes(len);
          uint k = len - 1;
          while (_i != 0) {
              bstr[k--] = byte(uint8(48 + _i % 10));
              _i /= 10;
          }
          return string(bstr);
     }
        
    function verifyScholarProfile(
        string memory _name,
        string[] memory _fields,
        string[] memory _subFields,
        string memory _tweetUrl
    ) public returns (bool) {
        require(!isVerifiedScholar[msg.sender], "already verified");
        // check if LINK was sent as gas
        chainlinkVerifier(_tweetUrl, addressToString(msg.sender));
        require(done.toString()== "true" , 'not verified');
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
        chainlinkVerifier(_tweetUrl, addressToString(msg.sender));
        require(done.toString()== "true" , 'not verified');
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
    function getPaper (
    uint256 _tokenId
    ) public view returns (PaperStruct memory){
    return paperById[_tokenId];
    }
    
    function chainlinkVerifier (string memory _tweetUrl, string memory _ethaddress) public returns(bytes32 requestId){
      Chainlink.Request memory req = buildChainlinkRequest("7a3192ceaf8b49f6983ef904de242637", address(this), this.fulfill.selector);
      req.add("tweeid", _tweetUrl);
      req.add("ethaddress", _ethaddress);
      return requestId= sendChainlinkRequestTo(oracle, req, fee);
    }
    
    function fulfill (bytes32 _requestId, bool _data) public
    recordChainlinkFulfillment(_requestId){
      data= _data;
    }    
}
