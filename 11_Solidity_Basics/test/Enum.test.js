const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Enum', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Enum");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should create four foods', async () => {
        for(let i = 1; i <= 4; i++) {
            const food = await contract[`food${i}`]();
            assert.isAtLeast(Number(food), 0);
        }
    });
});