const { ethers } = require('hardhat');
const { assert } = require('chai');
const deploy = require('../deploy');
const fs = require('fs');

describe('Escrow - Deploy Script', function () {
    let contract;
    let accounts = {};
    const deposit = ethers.parseEther("1");
    const artifactLocation = "./artifacts/contracts/Escrow.sol/Escrow.json";

    beforeEach(async () => {
        const roles = ['depositor', 'arbiter', 'beneficiary'];
        const signers = await ethers.getSigners();
        for (let i = 0; i < roles.length; i++) {
            accounts[roles[i]] = { signer: signers[i], address: signers[i].address };
        }

        const { abi, bytecode } = JSON.parse(fs.readFileSync(artifactLocation).toString());
        contract = await deploy(
            abi,
            bytecode,
            accounts.depositor.signer,
            accounts.arbiter.address,
            accounts.beneficiary.address
        );
        await contract.waitForDeployment();
    });

    it('should resolve with a contract', async () => {
        assert(contract, "Expected deploy to return a contract!");
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