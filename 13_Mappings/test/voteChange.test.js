const { ethers } = require('hardhat');
const { assert, expect } = require('chai');

const CHOICES = { YES: 0, NO: 1 };

describe('VoteChange', function () {
    let contract, accounts;

    before(async () => {
        const Contract = await ethers.getContractFactory("VoteChange");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
        accounts = await ethers.getSigners();
    });

    it('should not allow changing a non-existent vote', async () => {
        await expect(contract.connect(accounts[5]).changeVote(CHOICES.NO)).to.be.reverted;
    });

    describe('after voting yes', () => {
        before(async () => {
            await contract.connect(accounts[0]).createVote(CHOICES.YES);
        });

        it('should find yes as the choice', async () => {
            assert.equal(await contract.findChoice(accounts[0].address), CHOICES.YES);
        });

        describe('after changing to no', () => {
            before(async () => {
                await contract.connect(accounts[0]).changeVote(CHOICES.NO);
            });

            it('should update the vote', async () => {
                assert.equal(await contract.findChoice(accounts[0].address), CHOICES.NO);
            });
        });
    });
});