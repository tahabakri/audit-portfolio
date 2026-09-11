const { ethers } = require('hardhat');
const { assert } = require('chai');

const CHOICES = { YES: 0, NO: 1 };

describe('ReturnVote', function () {
    let contract, accounts;

    before(async () => {
        const Contract = await ethers.getContractFactory("ReturnVote");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
        accounts = await ethers.getSigners();
    });

    it('should return a yes vote', async () => {
        const vote = await contract.connect(accounts[0]).createVote(CHOICES.YES);
        assert.equal(vote.choice, CHOICES.YES);
        assert.equal(vote.voter, accounts[0].address);
    });

    it('should return a no vote', async () => {
        const vote = await contract.connect(accounts[1]).createVote(CHOICES.NO);
        assert.equal(vote.choice, CHOICES.NO);
        assert.equal(vote.voter, accounts[1].address);
    });
});