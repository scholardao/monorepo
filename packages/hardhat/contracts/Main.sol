pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import "./Validator.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Paper is  ERC721URIStorage, Validator{

  constructor(
    string memory _tokenName,
    string memory _tokenSymbol
    )
    ERC721(_tokenName, _tokenSymbol) {}

  using Counters for Counters.Counter;
  Counters.Counter private nextPaperId;

  enum PublicationStage {Draft, Preprint, Published}
  enum ReviewerDecision {Accept, MinorRevision, MajorRevision, Reject}
  enum ValidatorDecision { Accept, Reject, RequestRevision }

  struct Paper {
    uint256 id;
    string name;
    address owner;
    address payable[] authors;
    string paperLink;
    string category;
    string subCategory;
    address payable [] peerReviewers;
    PublicationStage stage;
    uint256 [] citationsUsed;
    address payable beneficiary;
    address[] sponsors; //check stage
    uint256 validatorTip;
    address payable validator;
    uint256 deadline;
    uint256 totalAmount;
  }

  struct Review {
  	uint256 paperId;
  	address payable reviewerId;
    ReviewerDecision reviewerDecision;
  	string commentsCid;
  }

  event paperCreated (
    uint256 id,
    address owner,
    address payable [] authors,
    string category,
    string subCategory
  );
  event ReviewAdded(
    uint256 tokenId,
    address reviewer,
    string commentCid,
    ReviewerDecision reviewerDecision
  );
  event Validated (
    uint tokenId,
    ValidatorDecision vDes
  );
  event ValidationRequestSent (
    uint _tokenId,
    address _validatorAddress
    );
  event ValidatorConfirmed (
    uint256 _tokenId,
    address _validator,
    uint256 _deadline
    );


  mapping (uint256 => Paper) public paperById;
  mapping (string => string[]) public subCategories;
  mapping (address => mapping(uint256 => uint256)) sponsorAmounts;
  mapping (address => mapping (uint256 => Review[])) reviews;
  mapping(address=>mapping(uint256=>bool)) validatorRequests;

  string[] public broadCategories;

  function submitDraft(
    string memory _name,
    address _owner,
    address payable[] memory _authors,
    string memory _tokenUri,
    string memory _category,
    string memory _subCategory,
    uint256[] memory _citationsUsed,
    address payable _beneficiary,
    address[] memory _sponsors
  )
    public
    payable
    returns (uint256)
  {

    nextPaperId.increment();
    uint256 newPaperId = nextPaperId.current();
    address payable [] memory _reviewers;
    address payable validator;
    Paper memory paper = Paper(
      newPaperId,
      _name,
      _owner,
      _authors,
      _tokenUri,
      _category,
      _subCategory,
      _reviewers,
      PublicationStage.Draft,
      _citationsUsed,
      _beneficiary,
      _sponsors,
      msg.value,
      validator,
      0,
      0
      );

    _safeMint(_owner, newPaperId);
    _setTokenURI(newPaperId, _tokenUri);


    //adds categories
    //since mappings already have values, every category already has every subcategory already. for example for subCategories['Computer'] every imaginable subcategory mapping value already exists, we can push to it.
    bool CategoryExists = false;
    for (uint i=0; i<broadCategories.length ; i++){
      if(keccak256(abi.encodePacked((broadCategories[i]))) == keccak256(abi.encodePacked((_category)))){
        CategoryExists = true;
      }
    }
    if(CategoryExists == false){
      broadCategories.push(_category);
    }

    //updates mappings
    paperById[newPaperId] = paper;

    emit paperCreated(
      newPaperId,
      _owner,
      _authors,
      _category,
      _subCategory
      );

    return newPaperId;
  }


  function review(
    uint256 _tokenId,
    ReviewerDecision _decision,
    string memory _commentsCid,
    address payable reviewer
    )
    public
    {
      require(paperById[_tokenId].stage == PublicationStage.Preprint, 'cannot review in this stage');
      require(scholars[reviewer]==true, 'unverified');
      string [] memory _fields = fields[reviewer];
      bool allowed = false;
      for (uint i =0; i<_fields.length; i++){

        if(keccak256(abi.encodePacked((_fields[i]))) == keccak256(abi.encodePacked((paperById[_tokenId].category)))){
          allowed = true;
        }
      }
      require(allowed == true, "fields do not match");
      Review memory review = Review (
        _tokenId,
        reviewer,
        _decision,
        _commentsCid
        );
      reviews[reviewer][_tokenId].push(review);
      paperById[_tokenId].peerReviewers.push(reviewer);

      emit ReviewAdded(
        _tokenId,
        reviewer,
        _commentsCid,
        _decision
        );
    }
  function requestValidation (
    uint256 _tokenId,
    address _validatorAddress
    )
    public
    {
      require(validatorFields[msg.sender].length != 0 , ' not a validator ');
      require(msg.sender == paperById[_tokenId].owner, 'only owner can send request');
      require(paperById[_tokenId].stage == PublicationStage.Draft, 'cannot send validation request in this stage.');
      validatorRequests[_validatorAddress][_tokenId] = true;
      emit ValidationRequestSent(
        _tokenId,
        _validatorAddress
        );
    }
  function confirmValidation (
    uint256 _tokenId,
    address payable _validator,
    uint256 _deadline
    ) public returns (uint256)
    {
      require(validatorFields[_validator].length != 0 , ' not a validator ');
      require (paperById[_tokenId].validator == address(0) , 'validator already assigned');
      require(paperById[_tokenId].stage == PublicationStage.Draft, 'cannot accept validation in this stage.');
      paperById[_tokenId].validator = _validator;
      paperById[_tokenId].stage = PublicationStage.Preprint;
      emit ValidatorConfirmed (
        _tokenId,
        _validator,
        _deadline
        );
      paperById[_tokenId].deadline = _deadline;
      return (_deadline);
    }

  function sellPaper (uint _tokenId, address _buyer) public {
      require(msg.sender == paperById[_tokenId].owner, 'only owner');
      require(paperById[_tokenId].stage == PublicationStage.Published, "not published");
      safeTransferFrom (msg.sender, _buyer, _tokenId);
  }

  function sponsorPaper (uint _tokenId) public payable {
    require( paperById[_tokenId].stage != PublicationStage.Published, 'cannot sponsor in this stage');
    if (sponsorAmounts[msg.sender][_tokenId]==0){
      paperById[_tokenId].sponsors.push(msg.sender);
    }
    sponsorAmounts[msg.sender][_tokenId] += msg.value;
    paperById[_tokenId].totalAmount+=msg.value;
  }

}




/*
contract DAO {
    mapping(string => string[]) fields;

    constructor() {
        fields["Computer Science"] = [
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
}

contract Scholar {
    address id;
    string name;

    // TODO: fields should be of type DAO.fields
    // (deploy DAO contract, then fetch its fields here using address of DAO)
    // or find some smart way to do it
    mapping(string => string[]) fields;

    mapping(string => bool) verification;
}
*/
