const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory('Contract');
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should create variable a: true', async () => {
        const a = await contract.a();
        assert.equal(a, true);
    });

    it('should create variable b: false', async () => {
        const b = await contract.b();
        assert.equal(b, false);
    });
});