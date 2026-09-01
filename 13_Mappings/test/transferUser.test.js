const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('UserMapping - Transfer', function () {
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

        it('should not allow a transfer to a non-existent user', async () => {
            let ex;
            try {
                await contract.connect(a1).transfer(a2.address, 50);
            } catch (_ex) {
                ex = _ex;
            }
            assert(ex, "Expected transaction to revert!");
        });

        describe('after creating another user', () => {
            beforeEach(async () => {
                await contract.connect(a2).createUser();
            });

            it('should be able to transfer to the new user', async () => {
                await contract.connect(a1).transfer(a2.address, 50);
                const user1 = await contract.users(a1.address);
                const user2 = await contract.users(a2.address);
                assert.equal(Number(user1.balance), 50);
                assert.equal(Number(user2.balance), 150);
            });

            it('should not allow a larger transfer than balance', async () => {
                let ex;
                try {
                    await contract.connect(a1).transfer(a2.address, 150);
                } catch (_ex) {
                    ex = _ex;
                }
                assert(ex, "Expected transaction to revert!");
            });
        });
    });
});