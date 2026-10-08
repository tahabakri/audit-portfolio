const { assert } = require('chai');

describe('MultiSig', function () {
    let contract;
    let accounts;
    let zero = ethers.ZeroAddress;
    let _required = 2;

    describe('Submit Transaction Tests', function () {
        beforeEach(async () => {
            const signers = await ethers.getSigners();
            accounts = signers.map(s => s.address);
            const MultiSig = await ethers.getContractFactory("MultiSig");
            contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
            await contract.waitForDeployment();
        });

        it('should add a transaction', async function () {
            await contract.submitTransaction(accounts[1], 100);
            let tx = await contract.transactions(0);
            let address = tx[0];
            assert.notEqual(address, zero);
        });

        it('should confirm a transaction', async function () {
            await contract.submitTransaction(accounts[1], 100);

            let confirmed = await contract.getConfirmationsCount(0);
            assert.equal(confirmed, 1);
        });

        it('should not call addTransaction externally', async function () {
            assert.equal(contract.addTransaction, undefined, "Did not expect addTransaction to be defined publicly!");
        });
    });
});