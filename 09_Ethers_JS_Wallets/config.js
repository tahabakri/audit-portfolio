const ganache = require('ganache-core');
const { utils } = require('ethers');

const PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const INITIAL_BALANCE = utils.parseEther("100");

// Single persistent instance for the entire test run
const ganacheProvider = ganache.provider({
    accounts: [
        {
            secretKey: PRIVATE_KEY,
            balance: INITIAL_BALANCE.toHexString(),
        }
    ]
});

module.exports = {
    ganacheProvider,
    PRIVATE_KEY,
    INITIAL_BALANCE,
};
