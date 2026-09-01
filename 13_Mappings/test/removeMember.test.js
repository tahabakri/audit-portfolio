const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Members - removeMember', function () {
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
                assert(await contract.isMember(members[i]));
            }
        });

        it('should not find a non-added member', async () => {
            assert(!(await contract.isMember(nonMember)));
        });

        describe('after removing a member', () => {
            before(async () => {
                await contract.connect(owner).removeMember(members[0]);
            });

            it('should not find that member', async () => {
                assert(!(await contract.isMember(members[0])));
            });

            it('should still find the other member', async () => {
                assert(await contract.isMember(members[1]));
            });
        });
    });
});