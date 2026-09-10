const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('ArraySum', function () {
    let contract;

    before(async () => {
        const Contract = await ethers.getContractFactory("ArraySum");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should sum five numbers', async () => {
        const result = await contract.sum([1, 2, 3, 4, 5]);
        assert.equal(Number(result), 15);
    });
});