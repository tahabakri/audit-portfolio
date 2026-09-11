const { ethers } = require('hardhat');
const { assert, expect } = require('chai');

describe('StackClub - Remove Members', function () {
    let contract, owner, accounts;

    beforeEach(async () => {
        const StackClub = await ethers.getContractFactory("StackClub");
        contract = await StackClub.deploy();
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        owner = signers[0];
        accounts = signers.slice(1);
    });

    it('should not allow a non-member to add a member', async () => {
        await expect(contract.connect(accounts[0]).addMember(accounts[0].address)).to.be.reverted;
    });

    it('should not allow a non-member to remove last member', async () => {
        await expect(contract.connect(accounts[0]).removeLastMember()).to.be.reverted;
    });

    describe('after adding a few members', () => {
        beforeEach(async () => {
            for (let i = 0; i < 3; i++) {
                await contract.connect(owner).addMember(accounts[i].address);
            }
        });

        it('should detect members', async () => {
            for (let i = 0; i < 3; i++) {
                assert(await contract.isMember(accounts[i].address));
            }
        });

        describe('after calling removeLastMember as a member', () => {
            beforeEach(async () => {
                await contract.connect(accounts[1]).removeLastMember();
            });

            it('should pop off the most recent member', async () => {
                assert(!(await contract.isMember(accounts[2].address)));
            });
        });
    });
});