const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Owner', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Owner");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should store the owner', async () => {
        const storedOwner = await contract.owner();
        const [deployer] = await ethers.getSigners();
        assert.equal(storedOwner, deployer.address);
    });
});