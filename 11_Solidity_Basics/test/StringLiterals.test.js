const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('StringLiterals', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("StringLiterals");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should create msg1 as bytes32 with hello world', async () => {
        const msg1 = await contract.msg1();
        const ascii = ethers.decodeBytes32String(msg1);
        assert(/hello world/i.test(ascii));
    });

    it('should create msg2 as string over 32 bytes', async () => {
        const msg2 = await contract.msg2();
        assert.isAtLeast(Buffer.byteLength(msg2, 'utf8'), 32);
    });
});