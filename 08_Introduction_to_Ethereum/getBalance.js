const provider = require('./provider');

async function getBalance(address) {
    const response = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance", // <-- fill in the method
        params: [address, "latest"],  // <-- fill in the params
    });

    return response.result;
}

module.exports = getBalance;

/**
 * LESSON: Learned to fetch raw Hex balances and convert them to decimal.
 * AUDITOR USE: Critical for verifying account solvency and checking for "Dust" balances in contract accounts.
 */