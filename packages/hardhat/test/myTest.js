const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

// describe("Scholar DAO", function() {
//   let daoContract;
//   describe("DAO", function() {
//     it("shoudl deploy DAO", async function() {
//       const DAO = await ethers.getContractFactory("DAO");
//       daoContract = await DAO.deploy();
//     });
//   });

//   let paperContract;
//   describe("Paper", function() {
//     it("shoudl deploy Paper", async function() {
//       const Paper = await ethers.getContractFactory("Paper");
//       paperContract = await Paper.deploy("ScholarDAO Paper", "SCHPAPER");
//     });
//     describe("submitDraft()", function() {
//       it("should be able to submit a paper", async function() {
//         await paperContract.submitDraft();

//         expect(await paperContract.purpose()).to.equal(newPurpose);
//       });
//     });
//   });
// });

describe("My Dapp", function() {
  let myContract;

  describe("YourContract", function() {
    it("Should deploy YourContract", async function() {
      const YourContract = await ethers.getContractFactory("YourContract");

      myContract = await YourContract.deploy();
    });

    describe("setPurpose()", function() {
      it("Should be able to set a new purpose", async function() {
        const newPurpose = "Test Purpose";

        await myContract.setPurpose(newPurpose);
        expect(await myContract.purpose()).to.equal(newPurpose);
      });
    });
  });
});
