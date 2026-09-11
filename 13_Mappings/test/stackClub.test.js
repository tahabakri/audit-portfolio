const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('StackClub', function () {
    let contract, accounts;

    before(async () => {
        const StackClub = await ethers.getContractFactory("StackClub");
        contract = await StackClub.deploy();
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        accounts = signers.map(s => s.address);
    });

    describe('after adding a few members', () => {
        before(async () => {
            for (let i = 0; i < 3; i++) {
                await contract.addMember(accounts[i]);
            }
        });

        it('should detect members', async () => {
            for (let i = 0; i < 3; i++) {
                assert(await contract.isMember(accounts[i]));
            }
        });

        it('should detect non-members', async () => {
            for (let i = 3; i < 6; i++) {
                assert(!(await contract.isMember(accounts[i])));
            }
        });
    });
});