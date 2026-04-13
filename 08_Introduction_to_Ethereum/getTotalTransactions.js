const provider = require('./provider');

async function getTotalTransactions(blockNumber) {
    const response = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: [blockNumber, true],
    });

    return response.result.transactions.length;
}

module.exports = getTotalTransactions;

/**
 * LESSON: Learned how to parse block metadata to extract transaction count.
 * AUDITOR USE: Used to analyze block density and identify potential network-level censorship or spam attacks.
 */