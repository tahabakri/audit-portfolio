const provider = require('./provider');

async function getTotalBalance(addresses) {

    const requests = addresses.map((address, index) => {
        return {
            jsonrpc: "2.0",
            id: index,
            method: "eth_getBalance",
            params: [address, "latest"]
        };

/**
 * LESSON: Learned to wrap legacy callback-based providers for modern async handling.
 * AUDITOR USE: Allows building clean, readable audit scripts using async/await for sequential vulnerability testing.
 */

    });

    const responses = await provider.send(requests);

    let total = 0;

    for (let res of responses) {
        total += parseInt(res.result, 16);
    }

    return total;
}

module.exports = getTotalBalance;

/**
 * LESSON: Learned to batch JSON-RPC requests to save network overhead.
 * AUDITOR USE: Efficiently auditing "Whale" clusters or tracking total value locked (TVL) across multiple protocol wallets.
 */

