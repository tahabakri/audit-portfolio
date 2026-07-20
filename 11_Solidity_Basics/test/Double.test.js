const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Double', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Double");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    [1, 4, 7].forEach((x) => {
        const expected = x * 2;
        it(`should double ${x} to get ${expected}`, async () => {
            const doubled = await contract.double(x);
            assert.equal(Number(doubled), expected);
        });
    });
});