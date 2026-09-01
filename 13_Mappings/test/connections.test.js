const { ethers } = require('hardhat');
const { assert } = require('chai');

const TYPES = {
    Unacquainted: 0,
    Friend: 1,
    Family: 2
};

describe('Contract - Connections', function () {
    let contract, s1, s2, a1, a2;

    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("Connections");
        contract = await Contract.deploy();
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        s1 = signers[0];
        s2 = signers[1];
        a1 = s1.address;
        a2 = s2.address;
    });

    const getConnection = (x, y) => contract.connections(x, y).then(Number);

    it('should have Unacquainted from s1 => s2', async () => {
        assert.equal(await getConnection(a1, a2), TYPES.Unacquainted);
    });

    describe('after connecting from both sides', () => {
        beforeEach(async () => {
            await contract.connect(s1).connectWith(a2, TYPES.Friend);
            await contract.connect(s2).connectWith(a1, TYPES.Friend);
        });

        it('should have Friend from s1 => s2', async () => {
            assert.equal(await getConnection(a1, a2), TYPES.Friend);
        });

        it('should have Friend from s2 => s1', async () => {
            assert.equal(await getConnection(a2, a1), TYPES.Friend);
        });
    });
});