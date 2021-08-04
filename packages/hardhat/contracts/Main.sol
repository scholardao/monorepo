pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract Validator {
  mapping (address => string[]) validatorFields;
  mapping (address => uint256) validatorCollateral;
  mapping (address => bool) scholars;
  mapping (address => string []) fields;

  function onboardValidators (
    address _validatorId,
    string [] memory _fields
    ) public payable{
      require(validatorFields[_validatorId].length == 0 , 'already onboard!');
      require( _fields.length != 0, 'fields cannot be empty');
      validatorFields[_validatorId] = _fields;
      validatorCollateral[_validatorId] = msg.value;
    }

    function onboardReviewers (
      address _scholarId,
      string [] memory _fields
      ) public {
        require(validatorFields[msg.sender].length != 0 , ' not a validator ');
        require(scholars[_scholarId] == false , 'already onboard');
        require(_fields.length != 0 ,"cannot enter empty fields");
        scholars[_scholarId] = true;
        fields[_scholarId] = _fields;
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
