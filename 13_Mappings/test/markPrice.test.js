const { ethers } = require('hardhat');
const { assert, expect } = require('chai');

describe('Collectible - Mark Price', function () {
    let collectible, response, blockNumber, owner, a2;

    before(async () => {
        const signers = await ethers.getSigners();
        owner = signers[0];
        a2 = signers[1];

        const Collectible = await ethers.getContractFactory("Collectible");
        collectible = await Collectible.deploy();
        await collectible.waitForDeployment();

        const oneEther = ethers.parseEther("1.0");
        response = await collectible.markPrice(oneEther);
        const receipt = await response.wait();
        blockNumber = receipt.blockNumber;
    });

    it('should revert if a non-owner tries to mark the price', async () => {
        const oneEther = ethers.parseEther("1.0");
        await expect(collectible.connect(a2).markPrice(oneEther)).to.be.reverted;
    });

    it('should emit a ForSale event', async () => {
        const block = await ethers.provider.getBlock(blockNumber);
        const receipt = await response.wait();

        const topic = collectible.interface.getEvent('ForSale').topicHash;
        const log = receipt.logs.find(x => x.topics.indexOf(topic) >= 0);
        const parsedLog = collectible.interface.parseLog(log);

        assert(parsedLog, "Expected a ForSale event to be emitted!");
        assert.equal(parsedLog.args.length, 2);
        assert.equal(parsedLog.args[0], ethers.parseEther("1.0"));
        assert.equal(Number(parsedLog.args[1]), block.timestamp);
    });
});