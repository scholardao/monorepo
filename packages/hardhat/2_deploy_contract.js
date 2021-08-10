// const Dao = artifacts.require('DAO.sol');
// const Paper = artifacts.require('Paper.sol');

// const ReviewerDecision = {
//     Accept : 0,
//     MinorRevision: 1,
//     MajorRevision: 2,
//     Reject: 3
// }

// module.exports = async function(deployer, _network, accounts) {
//   const [author1, author2, author3, author4, validator1, validator2, validator3, _] = accounts;
//   await deployer.deploy(Dao);
//   await deployer.deploy(Paper , 'PaperSCH' ,'PSCH');
//   const [dao, paper] = await Promise.all(
//     [Dao, Paper].map(contract => contract.deployed())
//   );

//   const increaseTime = async (seconds) => {
//     await web3.currentProvider.send({
//       jsonrpc: '2.0',
//       method: 'evm_increaseTime',
//       params: [seconds],
//       id: 0,
//     }, () => {});
//     await web3.currentProvider.send({
//       jsonrpc: '2.0',
//       method: 'evm_mine',
//       params: [],
//       id: 0,
//     }, () => {});
//   };

//   dao.verifyScholarProfile(
//     'Hermione Granger',
//     ["Computer Science","Physics", "Life Sciences"],
//     ["Theory of computation","Artificial intelligence","Information and coding theory","Game Theory"],
//     `authortweeturl`,
//     {from: author1}
//   );

//   dao.verifyValidatorProfile(
//     'The Little Prince',
//     author1, //idk
//     ['Computer Sciecne','Maths','Life Sciences'],
//     ["Information and coding theory","Game Theory"],
//     'tweeturl',
//     web3.utils.toWei('0.00000000000001', 'ether'),
//     {from: validator1, value : web3.utils.toWei('0.00000000000001', 'ether') }
//   );

//   await increaseTime(1);
//   paper.submitDraft(
//     'Benefits of Orange Jam',
//     [author1, author2, author3],
//     "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/",
//     ['Computer Science', 'Physics'],
//     ["Information and coding theory","Game Theory"],
//     [],
//     web3.utils.toWei('0.00000000000001', 'ether') ,
//     [],
//     {from: author1, value: web3.utils.toWei('0.00000000000001', 'ether') }
//   );
// };
