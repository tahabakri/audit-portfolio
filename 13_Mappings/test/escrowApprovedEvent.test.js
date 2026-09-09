const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Escrow - Approved Event', function () {
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

    describe('after approval', () => {
        let receipt;

        beforeEach(async () => {
            const tx = await contract.connect(accounts.arbiter.signer).approve();
            receipt = await tx.wait();
        });

        it('should emit the Approved event with correct amount', async () => {
            const topic = contract.interface.getEvent('Approved').topicHash;
            const log = receipt.logs.find(x => x.topics.indexOf(topic) >= 0);
            const parsedLog = contract.interface.parseLog(log);

            assert(parsedLog, "Expected an Approved event!");
            assert.equal(parsedLog.args[0], deposit);
        });
    });
});