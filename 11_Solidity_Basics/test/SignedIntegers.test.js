const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('SignedIntegers', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("SignedIntegers");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should create two variables, one positive and one negative', async () => {
        const a = await contract.a();
        const b = await contract.b();
        const aPositive = a > 0 && b < 0;
        const bPositive = b > 0 && a < 0;
        assert(aPositive || bPositive);
    });

    it('should find the absolute difference between the two variables', async () => {
        const a = await contract.a();
        const b = await contract.b();
        const difference = await contract.difference();
        assert.equal(Number(difference), Math.abs(Number(a) - Number(b)));
    });
});