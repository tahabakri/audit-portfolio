const { Wallet, providers } = require('ethers');
const { ganacheProvider, PRIVATE_KEY } = require('./config');

// Create a new web3 provider wrapping the ganache instance
const provider = new providers.Web3Provider(ganacheProvider);

// Connect the wallet to the provider so it can send transactions
const wallet = new Wallet(PRIVATE_KEY, provider);

async function sendEther({ value, to }) {
    /**
     * 💡 Goal: Broadcast the TX to Ethereum
     * 
     * We sign the transaction and then use the provider to broadcast it.
     */
    const rawTx = await wallet.signTransaction({ 
        value, 
        to, 
        gasLimit: 0x5208, // 21000
        gasPrice: 0x3b9aca00 // 1 Gwei
    });

    // Send the raw transaction and return the transaction promise
    return provider.sendTransaction(rawTx);
}

module.exports = sendEther;
