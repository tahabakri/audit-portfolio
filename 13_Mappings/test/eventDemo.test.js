const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('EventDemo', function () {
    let contract;

    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("EventDemo");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should emit PointsAdded event when points are added', async () => {
        const signers = await ethers.getSigners();
        const user = signers[0];

        // expect() checks that calling addPoints EMITS the PointsAdded event
        // with the EXACT arguments we specify
        await expect(contract.connect(user).addPoints(50))
            .to.emit(contract, 'PointsAdded')
            .withArgs(user.address, 50);
    });
});