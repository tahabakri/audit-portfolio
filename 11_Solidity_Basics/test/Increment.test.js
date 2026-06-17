const { ethers } = require('hardhat');
const { assert } = require('chai');

const num = 0;

describe('Constructor', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Constructor");
        contract = await Contract.deploy(num);
        await contract.waitForDeployment();
    });

    it('should set the initial value to 0', async () => {
        const x = await contract.x();
        assert.equal(Number(x), 0);
    });

    describe('after one increment call', () => {
        before(async () => {
            await contract.increment();
        });

        it('should increase the value to 1', async () => {
            const x = await contract.x();
            assert.equal(Number(x), 1);
        });
    });

    describe('after a second increment call', () => {
        before(async () => {
            await contract.increment();
        });

        it('should increase the value to 2', async () => {
            const x = await contract.x();
            assert.equal(Number(x), 2);
        });
    });
});