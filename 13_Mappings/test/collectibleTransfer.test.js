const { ethers } = require('hardhat');
const { assert, expect } = require('chai');

describe('Collectible - Transfer', function () {
    let collectible, owner, a2;

    before(async () => {
        const signers = await ethers.getSigners();
        owner = signers[0];
        a2 = signers[1];

        const Collectible = await ethers.getContractFactory("Collectible");
        collectible = await Collectible.deploy();
        await collectible.waitForDeployment();
    });

    it('should emit a Transfer event', async () => {
        const tx = await collectible.transfer(a2.address);
        const receipt = await tx.wait();

        const topic = collectible.interface.getEvent('Transfer').topicHash;
        const log = receipt.logs.find(x => x.topics.indexOf(topic) >= 0);
        const parsedLog = collectible.interface.parseLog(log);

        assert(parsedLog, "Expected a Transfer event to be emitted!");
        assert.equal(parsedLog.args.length, 2);
        assert.equal(parsedLog.args[0], owner.address);
        assert.equal(parsedLog.args[1], a2.address);
    });

    it('should revert if a non-owner tries to transfer', async () => {
        await expect(collectible.connect(owner).transfer(a2.address)).to.be.reverted;
    });
});