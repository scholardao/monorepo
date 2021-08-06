pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SCH is ERC20 {
    address public admin;
    uint256 public deploymentTime;
    uint256 public year;
    uint256 public supply;

    constructor(uint256 _supply) ERC20("ScholarDAO Token", "SCH") {
        deploymentTime = block.timestamp;
        year = 0;
        supply = _supply;
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == admin, "Only admin"); // mint to the DAO contract.
        _mint(to, amount);
    }

    function checkInflation(address _to) public returns (bool success) {
        if (block.timestamp >= deploymentTime + 31557600) {
            // 31557600 seconds per year
            uint256 supplyIncrease = (supply * 10) / 100;
            _mint(_to, supplyIncrease);
            year += 1; // increase the current year count
            supply += supplyIncrease; // increase supply count
            deploymentTime += 31557600; // increase the time since deployment
            return true;
        } else {
            return false;
        }
    }
}
