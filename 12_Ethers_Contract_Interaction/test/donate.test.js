const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Owner - Donate', function () {
    const charity = ethers.Wallet.createRandom().address;
    const donation = ethers.parseEther("1");
    let contract;
    let owner;
    let tipper;

    before(async () => {
        const Contract = await ethers.getContractFactory("Owner");
        contract = await Contract.deploy(charity);
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        owner = signers[0];
        tipper = signers[1];

        const contractAddress = await contract.getAddress();
        await owner.sendTransaction({ to: contractAddress, value: donation });
    });

    it('should receive the initial donation', async () => {
        const contractAddress = await contract.getAddress();
        const balance = await ethers.provider.getBalance(contractAddress);
        assert.equal(balance, donation);
    });

    describe('after donating', () => {
        before(async () => {
            await contract.connect(tipper).donate();
        });

        it('should add the donations to the charity balance', async () => {
            const charityBalance = await ethers.provider.getBalance(charity);
            assert.equal(charityBalance, donation);
        });
    });
});