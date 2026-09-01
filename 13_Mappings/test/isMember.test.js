const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Contract - isMember', function () {
    let contract;
    let members;
    let nonMember;

    before(async () => {
        const Contract = await ethers.getContractFactory("Members");
        contract = await Contract.deploy();
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        members = [signers[0].address, signers[1].address];
        nonMember = signers[2].address;
    });

    describe('adding a couple members', () => {
        before(async () => {
            for (let i = 0; i < members.length; i++) {
                await contract.addMember(members[i]);
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
    });
});