const { ethers } = require('hardhat');
const { assert } = require('chai');
const { deposit } = require('../index');

describe('Deposit', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Deposit");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should deposit at least 1 ether', async () => {
        await deposit(contract);
        const address = await contract.getAddress();
        const balance = await ethers.provider.getBalance(address);
        assert(balance >= ethers.parseEther("1"));
    });
});