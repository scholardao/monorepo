pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Validator {

  IERC20 public token;

  constructor(address _token) {
   token = IERC20(_token);
  }

  mapping (address => string[]) validatorFields;
  mapping (address => uint256) validatorCollateral;
  mapping (address => bool) scholars;
  mapping (address => string []) fields;

  function collectCollateralFromValidators (
    address payable _validatorId,
    string [] memory _fields,
    uint256 _amount
    ) public payable{
      require(validatorFields[_validatorId].length == 0 , 'already onboard!');
      require( _fields.length != 0, 'fields cannot be empty');
      //todo: twitter verification.
      validatorFields[_validatorId] = _fields;
      //if we take eth
      //deposit eth. calc equaltokensupply and transfer it to them
      //put in mapping
      token.transferFrom(_validatorId, address(this), _amount);
      validatorCollateral[_validatorId] += _amount;
    }

    function verifyResearchers (
      address _scholarId,
      string [] memory _fields
      ) public {
        //todo: twitter verification.
        require(scholars[_scholarId] == false , 'already verified');
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
