const { Wallet, providers } = require('ethers');
const { ganacheProvider, PRIVATE_KEY } = require('./config');

// Create a new web3 provider wrapping the ganache instance
const provider = new providers.Web3Provider(ganacheProvider);

// Connect the wallet to the provider (this enables automatic nonce/gas management)
const wallet = new Wallet(PRIVATE_KEY, provider);

async function sendEther({ value, to }) {
    /**
     * 💡 Goal: Add the Nonce (via wallet.sendTransaction)
     * 
     * wallet.sendTransaction is a "one-stop shop":
     * 1. It fetches the current nonce (pending)
     * 2. It populates gasPrice and gasLimit if needed
     * 3. It signs the transaction
     * 4. It broadcasts it to the network
     */
    return wallet.sendTransaction({ 
        value, 
        to, 
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00 
    });
}

module.exports = sendEther;
