const { Wallet, providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * 💡 Goal: Retrieve the Balance
 * 
 * Given a privateKey, return a promise that resolves with the 
 * balance of the address associated with it.
 */
function findMyBalance(privateKey) {
    // 1. Create a wallet instance from the private key
    // 2. Connect it to the provider
    const wallet = new Wallet(privateKey, provider);

    // 3. Return the promise from getBalance()
    return wallet.getBalance();
}

module.exports = findMyBalance;
