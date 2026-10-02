const { assert } = require('chai');
describe('MultiSig', function () {
    let contract;
    let accounts;
    let MultiSig;
    before(async () => {
        MultiSig = await ethers.getContractFactory("MultiSig");
        const signers = await ethers.getSigners();
        accounts = signers.map((s) => s.address);
    });

    describe('for a valid multisig', () => {
        let _required = 2;
        before(async () => {
            contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
            await contract.waitForDeployment();
        });

        it('should set an array of owners', async () => {
            let firstOwner = await contract.owners(0);
            let lastOwner = await contract.owners(2);
            assert.equal(accounts[2], lastOwner);
            assert.equal(accounts[0], firstOwner);
        });

        it('should set required confirmations', async () => {
            let required = await contract.required();
            assert.equal(_required, Number(required));
        });
    });

    describe('for a multisig with no owners', () => {
        it('should revert', async () => {
            await expectThrow(MultiSig.deploy([], 1));
        });
    });

    describe('for a multisig with no required confirmations', () => {
        it('should revert', async () => {
            await expectThrow(MultiSig.deploy(accounts.slice(0,3), 0));
        });
    });

    describe('for a multisig with more required confirmations than owners', () => {
        it('should revert', async () => {
            await expectThrow(MultiSig.deploy(accounts.slice(0,3), 4));
        });
    });
});

async function expectThrow(promise) {
    const errMsg = 'Expected throw not received';
    try {
        await promise;
    } catch (err) {
        return;
    }
    assert(false, errMsg);
}
