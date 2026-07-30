const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Sidekick - Encode With Signature", () => {
    let hero, sidekick;

    before(async () => {
        const Hero = await ethers.getContractFactory("Hero");
        hero = await Hero.deploy();
        await hero.waitForDeployment();

        const Sidekick = await ethers.getContractFactory("Sidekick");
        sidekick = await Sidekick.deploy();
        await sidekick.waitForDeployment();
    });

    describe("after sending the alert", () => {
        before(async () => {
            const heroAddress = await hero.getAddress();
            await sidekick.sendAlert(heroAddress, 5, true);
        });

        it("should have the sidekick alert the hero", async () => {
            const ambush = await hero.ambush();

            assert(ambush.alerted);
            assert.equal(ambush.enemies, 5);
            assert.equal(ambush.armed, true);
        });
    });
});