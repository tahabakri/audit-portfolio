const { assert } = require('chai');

describe('MultiSig', function () {
    let contract;
    let signers;
    let accounts;
    let _required = 2;

    beforeEach(async () => {
        signers = await ethers.getSigners();
        accounts = signers.map(s => s.address);
        const MultiSig = await ethers.getContractFactory("MultiSig");
        contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
        await contract.waitForDeployment();
    });

    describe('after creating the first transaction', function () {
        beforeEach(async () => {
            await contract.addTransaction(accounts[1], 100);
            await contract.confirmTransaction(0);
        });

        it('should confirm the transaction', async function () {
            let confirmed = await contract.getConfirmationsCount(0);
            assert.equal(confirmed, 1);
        });

        describe('after creating the second transaction', function () {
            beforeEach(async () => {
                await contract.addTransaction(accounts[1], 100);
                await contract.confirmTransaction(1);
                await contract.connect(signers[1]).confirmTransaction(1);
            });

            it('should confirm the transaction twice', async function () {
                let confirmed = await contract.getConfirmationsCount(1);
                assert.equal(confirmed, 2);
            });
        });
    });
});