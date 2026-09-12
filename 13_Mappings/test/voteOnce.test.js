const { ethers } = require('hardhat');
const { assert } = require('chai');

const CHOICES = { YES: 0, NO: 1 };

describe('VoteOnce', function () {
    let contract, accounts;

    before(async () => {
        const Contract = await ethers.getContractFactory("VoteOnce");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
        accounts = await ethers.getSigners();
    });

    describe('after voting yes', () => {
        before(async () => {
            await contract.connect(accounts[0]).createVote(CHOICES.YES);
        });

        it('should store a new vote', async () => {
            const vote = await contract.votes(0);
            assert.equal(vote.choice, CHOICES.YES);
            assert.equal(vote.voter, accounts[0].address);
        });

        it('should not allow the same address to vote again', async () => {
            let ex;
            try {
                await contract.connect(accounts[0]).createVote(CHOICES.NO);
            } catch (_ex) {
                ex = _ex;
            }
            assert(ex, "Expected transaction to revert!");
        });
    });

    describe('after voting no', () => {
        before(async () => {
            await contract.connect(accounts[1]).createVote(CHOICES.NO);
        });

        it('should store a new vote', async () => {
            const vote = await contract.votes(1);
            assert.equal(vote.choice, CHOICES.NO);
            assert.equal(vote.voter, accounts[1].address);
        });

        it('should not allow the same address to vote again', async () => {
            let ex;
            try {
                await contract.connect(accounts[1]).createVote(CHOICES.NO);
            } catch (_ex) {
                ex = _ex;
            }
            assert(ex, "Expected transaction to revert!");
        });
    });
});