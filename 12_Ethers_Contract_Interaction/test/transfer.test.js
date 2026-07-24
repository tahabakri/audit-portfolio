const { ethers } = require('hardhat');
const { assert } = require('chai');
const { transfer } = require('../index');

describe('Token', function () {
    let contract;
    let owner;
    let friend;
    before(async () => {
        const signers = await ethers.getSigners();
        owner = signers[0].address;
        friend = signers[1].address;

        const Contract = await ethers.getContractFactory("Token");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    describe('after transfer', () => {
        before(async () => {
            await transfer(contract, friend);
        });

        it('should decrease the owner balance', async () => {
            const balance = await contract.balances(owner);
            assert(Number(balance) < 1000);
        });

        it('should increase the friend balance', async () => {
            const balance = await contract.balances(friend);
            assert(Number(balance) > 0);
        });
    });
});