const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Collectible', function () {
    let deployedEvent;

    before(async () => {
        const Collectible = await ethers.getContractFactory('Collectible');
        const collectible = await Collectible.deploy();
        const receipt = await collectible.deploymentTransaction().wait();

        // get the topic for this contract's Deployed event
        const topic = collectible.interface.getEvent('Deployed').topicHash;
        const log = receipt.logs.find(x => x.topics.indexOf(topic) >= 0);
        deployedEvent = collectible.interface.parseLog(log);
    });

    it('should have emitted a deployed event', async () => {
        assert(deployedEvent, "Expected a Deployed event to be emitted!");
        assert.equal(deployedEvent.args.length, 1, "Only expected 1 event value!");
        const [owner] = await ethers.getSigners();
        assert.equal(deployedEvent.args[0], owner.address);
    });
});