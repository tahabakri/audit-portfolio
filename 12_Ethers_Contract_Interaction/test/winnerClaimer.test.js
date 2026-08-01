const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('WinnerClaimer - tx.origin Puzzle', function () {
    let target, claimer;

    before(async () => {
        const Target = await ethers.getContractFactory("WinnerTarget");
        target = await Target.deploy();
        await target.waitForDeployment();

        const Claimer = await ethers.getContractFactory("WinnerClaimer");
        claimer = await Claimer.deploy();
        await claimer.waitForDeployment();
    });

    it('should emit Winner event when called through the middleman contract', async () => {
        const targetAddress = await target.getAddress();
        const tx = await claimer.claim(targetAddress);
        const receipt = await tx.wait();

        // check that a Winner event was emitted
        const events = receipt.logs;
        assert(events.length > 0, "No events were emitted!");
    });

    it('should FAIL if called directly (proving the puzzle logic)', async () => {
        let ex;
        try {
            await target.attempt();
        } catch (_ex) {
            ex = _ex;
        }
        if (!ex) {
            assert.fail("Expected direct call to fail, but it succeeded!");
        }
    });
});