const provider = require('./provider');

async function getBlockNumber() {
    const response = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
    });
    
    return parseInt(response.result);
}

module.exports = getBlockNumber;

/**
 * LESSON: Learned to retrieve the current chain height (latest block).
 * AUDITOR USE: Helps determine the chronological order of transactions and audit timestamps for time-locked contracts.
 */