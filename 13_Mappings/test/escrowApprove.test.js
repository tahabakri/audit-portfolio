const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Escrow - Approve', function () {
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

    describe('after approval', () => {
        let beforeBalance;

        before(async () => {
            beforeBalance = await ethers.provider.getBalance(accounts.beneficiary.address);
            await contract.connect(accounts.arbiter.signer).approve();
        });

        it('should transfer balance to beneficiary', async () => {
            const after = await ethers.provider.getBalance(accounts.beneficiary.address);
            assert.equal(after - beforeBalance, deposit);
        });

        it('should set isApproved to true', async () => {
            const isApproved = await contract.isApproved();
            assert(isApproved, "Expected isApproved to be true!");
        });
    });
});
