const ganache = require('ganache-core');

// Create a ganache provider with a funded account
const PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const ganacheProvider = ganache.provider({
    accounts: [
        {
            secretKey: PRIVATE_KEY,
            balance: "0x" + (100n * 10n**18n).toString(16), // 100 ETH
        }
    ]
});

module.exports = {
    ganacheProvider,
    PRIVATE_KEY,
};
