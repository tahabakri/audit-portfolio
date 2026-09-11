const { ethers } = require('hardhat');
const { assert } = require('chai');

async function getArrayElements(getterFn) {
    let vals = [];
    try {
        for (let i = 0; ; i++) {
            vals.push(await getterFn(i));
        }
    } catch (ex) {}
    return vals.map(x => Number(x));
}

describe('FilterEven', function () {
    let contract;

    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("FilterEven");
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it('should store the filtered evenNumbers', async () => {
        await contract.filterEven([1, 2, 1, 4, 5]);
        assert.sameMembers(await getArrayElements(contract.evenNumbers), [2, 4]);
    });

    it('should store the filtered evenNumbers (second case)', async () => {
        await contract.filterEven([1, 1, 2, 10, 2]);
        assert.sameMembers(await getArrayElements(contract.evenNumbers), [2, 10, 2]);
    });
});