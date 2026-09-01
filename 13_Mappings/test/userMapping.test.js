const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Contract - User Mapping', function () {
    let contract, a1, a2;

    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("UserMapping");
        contract = await Contract.deploy();
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        a1 = signers[0];
        a2 = signers[1];
    });

    describe('after creating a user', () => {
        beforeEach(async () => {
            await contract.connect(a1).createUser();
        });

        it('should return the user', async () => {
            const user = await contract.users(a1.address);
            assert.equal(Number(user.balance), 100);
            assert(user.isActive, "Expected isActive to be true");
        });

        it('should not allow the same address to create another user', async () => {
            let ex;
            try {
                await contract.connect(a1).createUser();
            } catch (_ex) {
                ex = _ex;
            }
            assert(ex, "Expected transaction to revert!");
        });
    });
});