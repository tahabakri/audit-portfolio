const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Contract - Tick', function () {
    let contract;
    let contractAddress;

    before(async () => {
        const Contract = await ethers.getContractFactory("Tick");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
        contractAddress = await contract.getAddress();
    });

    describe('after 9 ticks', () => {
        before(async () => {
            for (let i = 0; i < 9; i++) {
                await contract.tick();
            }
        });

        it('should still exist', async () => {
            const bytecode = await ethers.provider.getCode(contractAddress);
            assert(bytecode !== "0x", "Contract does not exist after 9 ticks!");
        });
    });

    describe('after the tenth tick', () => {
        before(async () => {
            await contract.tick();
        });

        it('should not have any code', async () => {
            const bytecode = await ethers.provider.getCode(contractAddress);
            assert.equal(bytecode, "0x");
        });
    });
});