const { ethers } = require('hardhat');
const { assert } = require('chai');
const approve = require('../approve');

describe('Escrow - Approve Script', function () {
    let contract;
    let accounts = {};
    const deposit = ethers.parseEther("1");

    beforeEach(async () => {
        const roles = ['depositor', 'arbiter', 'beneficiary'];
        const signers = await ethers.getSigners();
        for (let i = 0; i < roles.length; i++) {
            accounts[roles[i]] = { signer: signers[i], address: signers[i].address };
        }

        const Contract = await ethers.getContractFactory("Escrow");
        contract = await Contract.connect(accounts.depositor.signer).deploy(
            accounts.arbiter.address,
            accounts.beneficiary.address,
            { value: deposit }
        );
        await contract.waitForDeployment();
    });

    it('should be funded', async () => {
        const contractAddress = await contract.getAddress();
        const balance = await ethers.provider.getBalance(contractAddress);
        assert.equal(balance, deposit);
    });

    describe('after approval', () => {
        let balanceBefore;

        beforeEach(async () => {
            balanceBefore = await ethers.provider.getBalance(accounts.beneficiary.address);
            const tx = await approve(contract, accounts.arbiter.signer);
            await tx.wait();
        });

        it('should transfer balance to beneficiary', async () => {
            const after = await ethers.provider.getBalance(accounts.beneficiary.address);
            assert.equal(after - balanceBefore, deposit);
        });
    });
});