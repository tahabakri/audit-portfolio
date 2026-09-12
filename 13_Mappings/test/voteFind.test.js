const { ethers } = require('hardhat');
const { assert } = require('chai');

const CHOICES = { YES: 0, NO: 1 };

describe('VoteFind', function () {
    let contract, accounts;

    before(async () => {
        const Contract = await ethers.getContractFactory("VoteFind");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
        accounts = await ethers.getSigners();
    });

    describe('after voting yes', () => {
        before(async () => {
            await contract.connect(accounts[0]).createVote(CHOICES.YES);
        });

        it('should return true for this address', async () => {
            assert(await contract.hasVoted(accounts[0].address));
        });

        it('should find the correct choice', async () => {
            assert.equal(await contract.findChoice(accounts[0].address), CHOICES.YES);
        });

        it('should return false for a different address', async () => {
            assert(!(await contract.hasVoted(accounts[1].address)));
        });
    });

    describe('after voting no', () => {
        before(async () => {
            await contract.connect(accounts[1]).createVote(CHOICES.NO);
        });

        it('should return true for this address', async () => {
            assert(await contract.hasVoted(accounts[1].address));
        });

        it('should find the correct choice', async () => {
            assert.equal(await contract.findChoice(accounts[1].address), CHOICES.NO);
        });
    });
});