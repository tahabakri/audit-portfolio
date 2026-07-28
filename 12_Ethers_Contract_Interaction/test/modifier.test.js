const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Modifier - OnlyOwner', function () {
    let contract;

    before(async () => {
        const Contract = await ethers.getContractFactory("Modifier");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should fail when another account attempts to set a config variable', async () => {
        const vals = ['A', 'B', 'C'];
        const signers = await ethers.getSigners();
        const other = signers[1];

        for (let i = 0; i < vals.length; i++) {
            const val = vals[i];
            const methodName = `set${val}`;
            let ex;
            try {
                await contract.connect(other)[methodName](1);
            }
            catch (_ex) { ex = _ex; }
            if (!ex) {
                assert.fail(`Call to ${methodName} with non-owner did not fail!`);
            }
        }
    });

    it('should not fail when owner attempts to set a config variable', async () => {
        const vals = ['A', 'B', 'C'];
        for (let i = 0; i < vals.length; i++) {
            const val = vals[i];
            const methodName = `set${val}`;
            await contract[methodName](1);
        }
    });
});