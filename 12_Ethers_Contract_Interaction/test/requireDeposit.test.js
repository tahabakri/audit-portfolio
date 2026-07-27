const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('RequireDeposit', function () {
    it('should not create a contract with a .5 ether deposit', async () => {
        let ex;
        try {
            const Contract = await ethers.getContractFactory("RequireDeposit");
            const contract = await Contract.deploy({ value: ethers.parseEther(".5") });
            await contract.waitForDeployment();
        }
        catch (_ex) { ex = _ex; }
        if (!ex) {
            assert.fail("Contract was created with a .5 ether deposit");
        }
    });

    it('should create a contract with a 1 ether deposit', async () => {
        const Contract = await ethers.getContractFactory("RequireDeposit");
        const contract = await Contract.deploy({ value: ethers.parseEther("1") });
        await contract.waitForDeployment();
    });

    it('should create a contract with a 2 ether deposit', async () => {
        const Contract = await ethers.getContractFactory("RequireDeposit");
        const contract = await Contract.deploy({ value: ethers.parseEther("2") });
        await contract.waitForDeployment();
    });
});