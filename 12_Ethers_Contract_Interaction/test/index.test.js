const { ethers } = require('hardhat');
const { assert } = require('chai');
const { getValue, setValue } = require('../index');

describe('Contract - getValue', function () {
    const random = Math.floor(Math.random() * 1000);
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy(random);
        await contract.waitForDeployment();
    });

    it('should get the value', async () => {
        const value = await getValue(contract);
        assert.equal(Number(value), random);
    });
});

describe('Modify - setValue', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Modify");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should set the value', async () => {
        await setValue(contract);
        const value = await contract.value();
        assert(Number(value) > 0, "Expecting value to be modified. Still set at 0!");
    });
});