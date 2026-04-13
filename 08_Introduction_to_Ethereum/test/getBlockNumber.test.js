const { assert } = require('chai');
const getBlockNumber = require('../getBlockNumber');
const provider = require('../provider');

describe('getBlockNumber', function () {
    let initialBlockNumber;

    before(async () => {
        initialBlockNumber = await getBlockNumber();
    });

    it('should get the current block number', async () => {
        const blockNumber = await getBlockNumber();
        assert.equal(blockNumber, initialBlockNumber);
    });

    describe('after mining a block', () => {
        before(() => {
            return provider.send({ id: 1, jsonrpc: "2.0", method: "evm_mine" });
        });

        it('should get the latest block number', async () => {
            const blockNumber = await getBlockNumber();
            assert.equal(blockNumber, initialBlockNumber + 1);
        });
    });
});