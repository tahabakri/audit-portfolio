const { ethers } = require('hardhat');
const { assert } = require('chai');

[[1, 3], [2, 4], [3, 7]].forEach(([x, y]) => {
    const expectedSum = x + y;
    describe(`Constructor: when deployed with ${x}`, function () {
        let contract;
        before(async () => {
            const Contract = await ethers.getContractFactory("Constructor");
            contract = await Contract.deploy(x);
            await contract.waitForDeployment();
        });

        it(`should add ${y} to get ${expectedSum}`, async () => {
            const sum = await contract.add(y);
            assert.equal(Number(sum), expectedSum);
        });
    });
});