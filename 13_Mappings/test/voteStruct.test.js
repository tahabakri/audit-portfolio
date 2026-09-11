const { ethers } = require('hardhat');
const { assert } = require('chai');

const CHOICES = { YES: 0, NO: 1 };

describe('VoteStruct', function () {
    let contract, accounts;

    before(async () => {
        const Contract = await ethers.getContractFactory("VoteStruct");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
        accounts = await ethers.getSigners();
    });

    it('should store a yes vote', async () => {
        await contract.connect(accounts[0]).createVote(CHOICES.YES);
        const vote = await contract.vote();
        assert.equal(vote.choice, CHOICES.YES);
        assert.equal(vote.voter, accounts[0].address);
    });

    it('should store a no vote', async () => {
        await contract.connect(accounts[1]).createVote(CHOICES.NO);
        const vote = await contract.vote();
        assert.equal(vote.choice, CHOICES.NO);
        assert.equal(vote.voter, accounts[1].address);
    });
});