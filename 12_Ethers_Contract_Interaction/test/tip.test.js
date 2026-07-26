const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Owner - Tip', function () {
    let contract;
    let owner;
    let tipper;

    before(async () => {
        const Contract = await ethers.getContractFactory("Owner");
        contract = await Contract.deploy();
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        owner = signers[0];
        tipper = signers[1];
    });

    describe('after a 0.25 ether tip', () => {
        const tip = ethers.parseEther("0.25");
        let balanceBefore;

        before(async () => {
            balanceBefore = await ethers.provider.getBalance(owner.address);
            await contract.connect(tipper).tip({ value: tip });
        });

        it('should send the tip to the owner', async () => {
            const balanceAfter = await ethers.provider.getBalance(owner.address);
            assert.equal(balanceAfter - balanceBefore, tip);
        });
    });
});