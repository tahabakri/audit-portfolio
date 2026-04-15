const ethers = require('ethers');
const { Wallet } = ethers;

/**
 * 💡 Task: Instantiate two Wallets
 * 
 * Wallet 1: Created from a Private Key
 * Wallet 2: Created from a Mnemonic Phrase
 */

// 1. Create a wallet with the provided private key
const wallet1 = new Wallet("0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d");

// 2. Create a wallet from the provided mnemonic phrase
const wallet2 = Wallet.fromMnemonic("plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice");

module.exports = {
    wallet1,
    wallet2,
}
