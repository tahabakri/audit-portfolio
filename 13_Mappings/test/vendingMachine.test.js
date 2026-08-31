const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('VendingMachine', function () {
    let contract;

    before(async () => {
        const Contract = await ethers.getContractFactory("VendingMachine");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should start with 10 sodas in stock', async () => {
        const numSodas = await contract.numSodas();
        assert.equal(Number(numSodas), 10);
    });

    it('should track sodas purchased per address', async () => {
        const signers = await ethers.getSigners();
        const buyer = signers[0];

        await contract.connect(buyer).purchaseSoda();

        const purchased = await contract.sodasPurchased(buyer.address);
        assert.equal(Number(purchased), 1);
    });

    it('should decrease stock after each purchase', async () => {
        const numSodas = await contract.numSodas();
        assert.equal(Number(numSodas), 9);
    });

    it('should NOT allow a second purchase from the same address', async () => {
        const signers = await ethers.getSigners();
        const buyer = signers[1];

        // first purchase should succeed
        await contract.connect(buyer).purchaseSoda();

        // second purchase from the SAME address should FAIL
        let ex;
        try {
            await contract.connect(buyer).purchaseSoda();
        } catch (_ex) {
            ex = _ex;
        }
        if (!ex) {
            assert.fail("Expected second purchase to fail, but it succeeded!");
        }
    });
});