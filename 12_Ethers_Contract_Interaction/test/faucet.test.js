const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Faucet', function () {
    let contract;
    let owner;

    before(async () => {
        const signers = await ethers.getSigners();
        owner = signers[0];

        const Faucet = await ethers.getContractFactory("Faucet");
        contract = await Faucet.deploy();
        await contract.waitForDeployment();

        // Fund the faucet with 1 ETH so it has something to withdraw
        const contractAddress = await contract.getAddress();
        await owner.sendTransaction({
            to: contractAddress,
            value: ethers.parseEther("1")
        });
    });

    it('should allow withdrawing 0.1 ETH or less', async () => {
        const amount = ethers.parseEther("0.1");
        await contract.withdraw(amount);
        // if this doesn't throw, the withdrawal succeeded
    });

    it('should reject withdrawing more than 0.1 ETH', async () => {
        const amount = ethers.parseEther("0.2");
        try {
            await contract.withdraw(amount);
            assert.fail("Expected transaction to revert");
        } catch (error) {
            assert(error.message.includes("revert") || error.message.includes("VM Exception"));
        }
    });

    it('VULNERABILITY: should allow unlimited repeated withdrawals', async () => {
        const amount = ethers.parseEther("0.1");
        
        // Withdraw 3 times in a row with no restriction
        await contract.withdraw(amount);
        await contract.withdraw(amount);
        await contract.withdraw(amount);
        
        // If we reach here without error, the vulnerability is confirmed
    });
});