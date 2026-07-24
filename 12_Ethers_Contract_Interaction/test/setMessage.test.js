const { ethers } = require('hardhat');
const { assert } = require('chai');
const { setMessage } = require('../index');

describe('Message', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Message");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should set the value', async () => {
        const signers = await ethers.getSigners();
        await setMessage(contract, signers[1]);
        const message = await contract.message();
        assert.notEqual(message, "", "Expecting message to be modified.");
    });
});