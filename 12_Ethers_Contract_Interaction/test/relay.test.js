const { assert } = require("chai");
const { ethers } = require("hardhat");

describe('Sidekick - Relay Calldata', function () {
    let sidekick, hero;

    beforeEach(async () => {
        const Sidekick = await ethers.getContractFactory("Sidekick");
        sidekick = await Sidekick.deploy();
        await sidekick.waitForDeployment();

        const Hero = await ethers.getContractFactory("Hero");
        hero = await Hero.deploy();
        await hero.waitForDeployment();

        const calldata = hero.interface.encodeFunctionData('alert', [5, true]);
        const heroAddress = await hero.getAddress();
        await sidekick.relay(heroAddress, calldata);
    });

    it("should have the sidekick alert the hero", async () => {
        const ambush = await hero.ambush();

        assert(ambush.alerted);
        assert.equal(ambush.enemies, 5);
        assert.equal(ambush.armed, true);
    });
});