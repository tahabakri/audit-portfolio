const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Owner - Receive Ether', function () {
    let contract;
    let value = ethers.parseEther("1");
    let owner;

    before(async () => {
        const Contract = await ethers.getContractFactory("Owner");
        const charity = ethers.Wallet.createRandom().address;
        contract = await Contract.deploy(charity);
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        owner = signers[0];

        const contractAddress = await contract.getAddress();
        await owner.sendTransaction({ to: contractAddress, value });
    });

    it('should store the owner', async () => {
        const storedOwner = await contract.owner();
        assert.equal(storedOwner, owner.address);
    });

    it('should receive the ether', async () => {
        const contractAddress = await contract.getAddress();
        const balance = await ethers.provider.getBalance(contractAddress);
        assert.equal(balance, value);
    });
});