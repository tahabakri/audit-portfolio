const provider = require('./provider');

async function getNonce(address) {
    const response = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionCount",
        params: [address, "latest"],
    });

    return parseInt(response.result);
}

module.exports = getNonce;

/**
 * LESSON: Learned that the Nonce tracks total outbound transactions.
 * AUDITOR USE: Vital for tracking transaction order and identifying potential Transaction Ordering (Front-running) vulnerabilities.
 */

