const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Escrow - Security', function () {
    let contract;
    let accounts = {};
    const deposit = ethers.parseEther("1");

    before(async () => {
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

    it('should revert if a non-arbiter calls approve', async () => {
        let ex;
        try {
            await contract.connect(accounts.beneficiary.signer).approve();
        } catch (_ex) {
            ex = _ex;
        }
        assert(ex, "Expected transaction to revert!");
    });

    it('should succeed when the arbiter calls approve', async () => {
        const before = await ethers.provider.getBalance(accounts.beneficiary.address);
        await contract.connect(accounts.arbiter.signer).approve();
        const after = await ethers.provider.getBalance(accounts.beneficiary.address);
        assert.equal(after - before, deposit);
    });
});