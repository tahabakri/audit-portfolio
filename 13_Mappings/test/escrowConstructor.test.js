const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Escrow - Constructor', function () {
    let contract;
    let accounts = {};

    before(async () => {
        const roles = ['depositor', 'arbiter', 'beneficiary'];
        const signers = await ethers.getSigners();
        for (let i = 0; i < roles.length; i++) {
            accounts[roles[i]] = { signer: signers[i], address: signers[i].address };
        }

        const Contract = await ethers.getContractFactory("Escrow");
        contract = await Contract.connect(accounts.depositor.signer).deploy(
            accounts.arbiter.address,
            accounts.beneficiary.address
        );
        await contract.waitForDeployment();
    });

    it('should set an arbiter', async () => {
        const _arbiter = await contract.arbiter();
        assert.equal(_arbiter, accounts.arbiter.address);
    });

    it('should set a depositor', async () => {
        const _depositor = await contract.depositor();
        assert.equal(_depositor, accounts.depositor.address);
    });

    it('should set a beneficiary', async () => {
        const _beneficiary = await contract.beneficiary();
        assert.equal(_beneficiary, accounts.beneficiary.address);
    });
});