pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

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
