const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Sidekick - Manual Signature', function () {
    let sidekick, hero;

    beforeEach(async () => {
        const Sidekick = await ethers.getContractFactory("Sidekick2Signature");
        sidekick = await Sidekick.deploy();
        await sidekick.waitForDeployment();

        const Hero = await ethers.getContractFactory("Hero");
        hero = await Hero.deploy();
        await hero.waitForDeployment();

        const heroAddress = await hero.getAddress();
        await sidekick.sendAlert(heroAddress);
    });

    it('should have alerted the hero', async () => {
        const alerted = await hero.alerted();
        assert.equal(alerted, true);
    });
});