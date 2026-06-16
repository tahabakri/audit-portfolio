const { ethers } = require('hardhat');
const { assert } = require('chai');

const num = Math.floor(Math.random() * 1000);

describe('Constructor', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Constructor");
        contract = await Contract.deploy(num);
        await contract.waitForDeployment();
    });

    it('should create variable x with the number stored in it', async () => {
        const x = await contract.x();
        assert.equal(Number(x), num);
    });
});