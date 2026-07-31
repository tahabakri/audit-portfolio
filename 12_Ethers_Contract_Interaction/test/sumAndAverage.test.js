const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Contract - Sum and Average', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("SumAndAverage");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    [[2, 2, 4, 4], [1, 3, 5, 7], [8, 8, 8, 8]].forEach(([a, b, c, d]) => {
        const expectedSum = a + b + c + d;
        const expectedAverage = expectedSum / 4;
        it(`should return sum ${expectedSum} and average ${expectedAverage}`, async () => {
            const values = await contract.sumAndAverage(a,b,c,d);
            assert.equal(Number(values[0]), expectedSum);
            assert.equal(Number(values[1]), expectedAverage);
        });
    });
});