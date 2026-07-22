const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Double: two number version', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Double");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    [[1, 3], [2, 4], [3, 7]].forEach(([x, y]) => {
        const [x2, y2] = [x * 2, y * 2];
        it(`should double ${x} and ${y} to get ${x2} and ${y2}`, async () => {
            const result = await contract["double(uint256,uint256)"](x, y);
            assert.equal(Number(result[0]), x2);
            assert.equal(Number(result[1]), y2);
        });
    });
});