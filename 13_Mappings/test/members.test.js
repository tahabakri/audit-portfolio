const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Members', function () {
    let contract;
    let members;
    let nonMember;
    let owner;

    before(async () => {
        const Contract = await ethers.getContractFactory("Members");
        contract = await Contract.deploy();
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        owner = signers[0];
        members = [signers[0].address, signers[1].address];
        nonMember = signers[2].address;
    });

    describe('adding a couple members', () => {
        before(async () => {
            for (let i = 0; i < members.length; i++) {
                await contract.connect(owner).addMember(members[i]);
            }
        });

        it('should find added members', async () => {
            for (let i = 0; i < members.length; i++) {
                assert(await contract.members(members[i]));
            }
        });

        it('should not find a non-member', async () => {
            assert(!(await contract.members(nonMember)));
        });
    });

    describe('access control', () => {
        it('should NOT allow a non-owner to add members', async () => {
            const signers = await ethers.getSigners();
            const attacker = signers[3];

            let ex;
            try {
                await contract.connect(attacker).addMember(signers[4].address);
            } catch (_ex) {
                ex = _ex;
            }
            if (!ex) {
                assert.fail("Expected non-owner to fail, but it succeeded!");
            }
        });
    });
});