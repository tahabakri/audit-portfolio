const { assert } = require('chai');
const getTotalTransactions = require('../getTotalTransactions');
const provider = require('../provider');

describe('getTotalTransactions', function () {
    it('should get the total transactions in a block', async () => {
        const accounts = await provider.send({
            id: 1,
            jsonrpc: "2.0",
            method: "eth_accounts"
        });
        const from = accounts.result[0];
        const to = accounts.result[1];

        // Send a transaction to create a block with 1 transaction
        await provider.send({
            id: 1,
            jsonrpc: "2.0",
            method: "eth_sendTransaction",
            params: [{ from, to, value: "0x1" }]
        });

        // Get the latest block number
        const blockNumberResponse = await provider.send({
            id: 1,
            jsonrpc: "2.0",
            method: "eth_blockNumber"
        });
        const blockNumber = parseInt(blockNumberResponse.result);

        // Check transaction count
        const txCount = await getTotalTransactions(blockNumber);
        assert.equal(txCount, 1);
    });
});
