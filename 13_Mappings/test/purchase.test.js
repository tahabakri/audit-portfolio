const { ethers } = require('hardhat');
const { assert, expect } = require('chai');

describe('Collectible - Purchase', function () {
    let collectible, oneEther, halfEther, owner, a2, a3;

    before(async () => {
        const Collectible = await ethers.getContractFactory("Collectible");
        collectible = await Collectible.deploy();
        await collectible.waitForDeployment();

        const signers = await ethers.getSigners();
        owner = signers[0];
        a2 = signers[1];
        a3 = signers[2];

        oneEther = ethers.parseEther("1.0");
        halfEther = ethers.parseEther("0.5");
    });

    it('should revert if purchased before marked for sale', async () => {
        await expect(collectible.connect(a2).purchase({ value: oneEther })).to.be.reverted;
    });

    describe('after marking a price', () => {
        before(async () => {
            await collectible.connect(owner).markPrice(oneEther);
        });

        it('should revert if wrong price sent', async () => {
            await expect(collectible.connect(a2).purchase({ value: halfEther })).to.be.reverted;
        });
    });

    describe('after purchasing', () => {
        let initialBalance;

        before(async () => {
            initialBalance = await ethers.provider.getBalance(owner.address);
            const tx = await collectible.connect(a2).purchase({ value: oneEther });
            await tx.wait();
        });

        it('should pay the owner', async () => {
            const balanceAfter = await ethers.provider.getBalance(owner.address);
            assert.equal(balanceAfter - initialBalance, oneEther);
        });

        it('should update the owner', async () => {
            const newOwner = await collectible.owner();
            assert.equal(newOwner, a2.address);
        });

        it('should fail on a second purchase attempt', async () => {
            await expect(collectible.connect(a3).purchase({ value: oneEther })).to.be.reverted;
        });
    });
});
