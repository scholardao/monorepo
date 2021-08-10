const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("Scholar DAO", function() {
  // ################
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rinkeby.infura.io/v3/329fe28aa0244cce8c5d93c5c2770010"
  );
  const signer = provider.getSigner();

  const daiAddress = "0x8BC364e2fdD97f1bC7072edeED55a8A816026325";

  // The ERC-20 Contract ABI, which is a common contract interface
  // for tokens (this is the Human-Readable ABI format)
  const daiAbi = [
    {
      inputs: [
        { internalType: "string", name: "_tokenName", type: "string" },
        { internalType: "string", name: "_tokenSymbol", type: "string" }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address"
        },
        { indexed: false, internalType: "bool", name: "approved", type: "bool" }
      ],
      name: "ApprovalForAll",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "string",
          name: "tokenURI",
          type: "string"
        },
        {
          indexed: false,
          internalType: "address payable",
          name: "owner",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address payable",
          name: "author",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "citationsUsed",
          type: "uint256[]"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "validatorTip",
          type: "uint256"
        }
      ],
      name: "PaperCreated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address",
          name: "reviewer",
          type: "address"
        },
        {
          indexed: false,
          internalType: "string",
          name: "commentCid",
          type: "string"
        },
        {
          indexed: false,
          internalType: "enum DAO.ReviewerDecision",
          name: "reviewerDecision",
          type: "uint8"
        }
      ],
      name: "ReviewAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "enum DAO.ValidatorDecision",
          name: "vDes",
          type: "uint8"
        }
      ],
      name: "Validated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address",
          name: "_validatorAddress",
          type: "address"
        }
      ],
      name: "ValidationRequestSent",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address",
          name: "_validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_deadline",
          type: "uint256"
        }
      ],
      name: "ValidatorConfirmed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address",
          name: "_validatorAddress",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_deadline",
          type: "uint256"
        }
      ],
      name: "ValidatorResponseSent",
      type: "event"
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "uint256", name: "_deadline", type: "uint256" }
      ],
      name: "acceptValidationRequest",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" }
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" }
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "isScholar",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "isValidator",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "isVerifiedScholar",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "paperById",
      outputs: [
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "string", name: "tokenURI", type: "string" },
        { internalType: "string", name: "title", type: "string" },
        { internalType: "address payable", name: "owner", type: "address" },
        { internalType: "address payable", name: "author", type: "address" },
        { internalType: "address payable", name: "validator", type: "address" },
        { internalType: "uint256", name: "validatorTip", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        {
          internalType: "enum DAO.PublicationStage",
          name: "stage",
          type: "uint8"
        },
        { internalType: "uint256", name: "amountRaised", type: "uint256" }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        {
          internalType: "address payable[]",
          name: "_validatorAddresses",
          type: "address[]"
        }
      ],
      name: "requestValidation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "address payable", name: "_reviewer", type: "address" },
        {
          internalType: "enum DAO.ReviewerDecision",
          name: "_decision",
          type: "uint8"
        },
        { internalType: "string", name: "_commentsCid", type: "string" }
      ],
      name: "review",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "address payable", name: "_validator", type: "address" }
      ],
      name: "selectValidator",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "address", name: "_buyer", type: "address" }
      ],
      name: "sellPaper",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" }
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "sponsorPaper",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "string", name: "_title", type: "string" },
        { internalType: "string", name: "_tokenURI", type: "string" },
        { internalType: "string[]", name: "_fields", type: "string[]" },
        { internalType: "string[]", name: "_subFields", type: "string[]" },
        {
          internalType: "uint256[]",
          name: "_citationsUsed",
          type: "uint256[]"
        },
        { internalType: "uint256", name: "_validatorTip", type: "uint256" },
        {
          internalType: "address payable[]",
          name: "_validatorAddresses",
          type: "address[]"
        }
      ],
      name: "submitDraft",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" }
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string[]", name: "_fields", type: "string[]" },
        { internalType: "string[]", name: "_subFields", type: "string[]" },
        { internalType: "string", name: "_tweetUrl", type: "string" }
      ],
      name: "verifyScholarProfile",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "address", name: "_scholarAddress", type: "address" },
        { internalType: "string[]", name: "_fields", type: "string[]" },
        { internalType: "string[]", name: "_subFields", type: "string[]" },
        { internalType: "string", name: "_tweetUrl", type: "string" },
        { internalType: "uint256", name: "_collateral", type: "uint256" }
      ],
      name: "verifyValidatorProfile",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "payable",
      type: "function"
    }
  ];

  // The Contract object
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);
  // const dai = ethers.utils.parseUnits("1.0", 18);

  const daiWithSigner = daiContract.connect(signer);
  describe("DOSS", function() {
    it("do somthin", async function() {
      const resp = await daiWithSigner.submitDraft(
        "The Sheep and the Rose",
        "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly",
        // "John Doe",
        ["Computer Science", "Life Sciences"],
        ["Information and coding theory", "Game Theory"],
        [],
        0,
        // web3.utils.toWei("0.00000000000001", "ether"),
        []
      );
      console.log("Myrep", resp);
      const papers = await daiWithSigner.paperById(1);
      console.log("papers", papers);
      expect(papers.title.length > 0);
    });
  });
  // ################

  let daoContract;
  describe("DAO", function() {
    it("shoudl deploy DAO", async function() {
      const DAO = await ethers.getContractFactory("DAO");
      daoContract = await DAO.deploy();
      console.log(daoContract);
    });
  });

  let paperContract;
  describe("Paper", function() {
    it("shoudl deploy Paper", async function() {
      const Paper = await ethers.getContractFactory("Paper");
      paperContract = await Paper.deploy("ScholarDAO Paper", "SCHPAPER");
    });
    describe("submitDraft()", function() {
      it("should be able to submit a paper", async function() {
        // // const newPurpose = "Test Purpose";
        // await paperContract.submitDraft();

        await paperContract.submitDraft(
          "The Sheep and the Rose",
          "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly",
          // "John Doe",
          ["Computer Science", "Life Sciences"],
          ["Information and coding theory", "Game Theory"],
          [],
          0,
          // web3.utils.toWei("0.00000000000001", "ether"),
          []
          // {
          //   from: author1,
          //   value: web3.utils.toWei("0.00000000000001", "ether")
          // }
        );
        const papers = await paperContract.paperById(1);
        console.log("papers", papers);
        expect(papers.title.length > 0);
      });
    });
  });
});

// describe("My Dapp", function() {
//   let myContract;

//   describe("YourContract", function() {
//     it("Should deploy YourContract", async function() {
//       const YourContract = await ethers.getContractFactory("YourContract");

//       myContract = await YourContract.deploy();
//     });

//     describe("setPurpose()", function() {
//       it("Should be able to set a new purpose", async function() {
//         const newPurpose = "Test Purpose";

//         await myContract.setPurpose(newPurpose);
//         expect(await myContract.purpose()).to.equal(newPurpose);
//       });
//     });
//   });
// });
