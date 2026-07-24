const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Reset', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Constructor");
        contract = await Contract.deploy(999); // starts at 999
        await contract.waitForDeployment();
    });

    it('should reset x back to 0', async () => {
        await contract.reset();
        const x = await contract.x();
        assert.equal(Number(x), 0);
    });
});