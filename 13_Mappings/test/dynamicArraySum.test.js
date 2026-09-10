const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('DynamicArraySum', function () {
    let contract;

    before(async () => {
        const Contract = await ethers.getContractFactory("DynamicArraySum");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should return the sum', async () => {
        assert.equal(await contract.sum([5]), 5);
        assert.equal(await contract.sum([1, 1, 1]), 3);
        assert.equal(await contract.sum([1, 2, 3, 4, 5]), 15);
    });
});