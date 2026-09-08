const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Escrow', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Escrow");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should declare an arbiter', () => {
        assert(contract.arbiter, "Did not find an arbiter!");
    });

    it('should declare a depositor', () => {
        assert(contract.depositor, "Did not find a depositor");
    });

    it('should declare a beneficiary', () => {
        assert(contract.beneficiary, "Did not find a beneficiary!");
    });
});
