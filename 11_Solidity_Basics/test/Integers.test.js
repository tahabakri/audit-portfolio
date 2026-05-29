const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Integers', function () {
    let contract;
    before(async () => {
        const Integers = await ethers.getContractFactory("Integers");
        contract = await Integers.deploy();
        await contract.waitForDeployment();
    });

    it('should create variable a which is less than 256', async () => {
        const a = await contract.a();
        assert.isAtMost(Number(a), 255);
    });

    it('should create variable b which is greater than or equal to 256', async () => {
        const b = await contract.b();
        assert.isAtLeast(Number(b), 256);
    });

    it('should create variable sum which equals a and b together', async () => {
        const a = await contract.a();
        const b = await contract.b();
        const sum = await contract.sum();
        assert.equal(Number(sum), Number(a) + Number(b));
    });
});