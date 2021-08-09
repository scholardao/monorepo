const { expectRevert } = require('@openzeppelin/test-helpers');
const Dao = artifacts.require('DAO.sol');
const Paper = artifacts.require('Paper.sol');

contract('DAO', (accounts) => {
  let dao, paper;
  const [author1, author2, validator1, validator2] = [accounts[1], accounts[2],accounts[3],accounts[4]];
  beforeEach(async() => {
    ([dao, paper] = await Promise.all([
      Dao.new(),
      Paper.new('PaperSCH' ,'PSCH')
    ]));
  });


  it('should add scholar', async()=>{
    await dao.verifyScholarProfile(
      'Hermione Granger',
      ["Computer Science","Physics", "Life Sciences"],
      ["Theory of computation","Artificial intelligence","Information and coding theory","Game Theory"],
      `authortweeturl`,
      {from: author1}
    );
    await dao.verifyScholarProfile(
      'Richard Feynman',
      ["Computer Science","Physics", "Life Sciences"],
      ["Theory of computation","Artificial intelligence","Information and coding theory","Game Theory"],
      `authortweeturl`,
      {from: author2}
    );
    const scholars = await dao.isVerifiedScholar(author1);
    assert (scholars.toString() === 'true');
    console.log(scholars);
  });

  it ('should add validator' , async () => {
    await dao.verifyValidatorProfile(
      'The Little Prince',
      author1,
      ['Computer Sciecne','Maths','Life Sciences'],
      ["Information and coding theory","Game Theory"],
      'tweeturl',
      web3.utils.toWei('0.00000000000001', 'ether'),
      {from: validator1, value : web3.utils.toWei('0.00000000000001', 'ether') }
    );
    const validators = await dao.isValidator(validator1);
    assert (validators.toString() === 'true');
    console.log(validators);
  });

  it('should add paper' , async () =>{
  await paper.submitDraft(
        'The Sheep and the Rose',
        [author1],
        "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/",
        ['Computer Science', 'Life Sciences'],
        ["Information and coding theory","Game Theory"],
        [],
        web3.utils.toWei('0.00000000000001', 'ether') ,
        [],
        {from: author1, value: web3.utils.toWei('0.00000000000001', 'ether') }
      );
    await paper.submitDraft(
          'the reflected sound of underground spirits',
          [author1, author2],
          "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/",
          ['Computer Science', 'Chemistry'],
          ["Information and coding theory","Game Theory"],
          [],
          web3.utils.toWei('0.00000000000001', 'ether') ,
          [],
          {from: author2, value: web3.utils.toWei('0.00000000000001', 'ether') }
        );

    const papers = await paper.paperById(1);
    assert(papers.title.length>0);
    const papers2 = await paper.paperById(2);
    assert(papers2.title.length>0);
  });
});
