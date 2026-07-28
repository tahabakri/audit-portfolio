const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('RequireDeposit - Withdraw', function () {
    let contract;
    const value = ethers.parseEther("2");

    before(async () => {
        const Contract = await ethers.getContractFactory("RequireDeposit");
        contract = await Contract.deploy({ value });
        await contract.waitForDeployment();
    });

    it('should fail when another account attempts to withdraw', async () => {
        let ex;
        try {
            const signers = await ethers.getSigners();
            await contract.connect(signers[1]).withdraw();
        }
        catch (_ex) { ex = _ex }
        if (!ex) {
            assert.fail("Attempt to withdraw with non-owner did not fail!");
        }
    });

    it('should succeed when the owner attempts to withdraw', async () => {
        const signers = await ethers.getSigners();
        const owner = signers[0];
        const balanceBefore = await ethers.provider.getBalance(owner.address);

        const tx = await contract.connect(owner).withdraw();
        const receipt = await tx.wait();
        const etherUsed = receipt.gasUsed * receipt.gasPrice;

        const balanceAfter = await ethers.provider.getBalance(owner.address);
        assert.equal(
            balanceAfter,
            balanceBefore - etherUsed + value
        );
    });
});