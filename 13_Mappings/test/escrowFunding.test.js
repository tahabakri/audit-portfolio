const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Escrow - Funding', function () {
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

    it('should be funded', async () => {
        const contractAddress = await contract.getAddress();
        const balance = await ethers.provider.getBalance(contractAddress);
        assert.equal(balance, deposit);
    });

    it('should set an arbiter', async () => {
        assert.equal(await contract.arbiter(), accounts.arbiter.address);
    });

    it('should set a depositor', async () => {
        assert.equal(await contract.depositor(), accounts.depositor.address);
    });

    it('should set a beneficiary', async () => {
        assert.equal(await contract.beneficiary(), accounts.beneficiary.address);
    });
});