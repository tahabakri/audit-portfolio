const ethers = require('ethers');
const { utils } = ethers;
const { wallet1 } = require('./wallets');

/**
 * 💡 Goal: Fill in the Properties
 * 
 * We are signing a legacy (Type 0) transaction to send 1 Ether.
 */

// We use wallet.signTransaction to create a signed transaction hex string
const signaturePromise = wallet1.signTransaction({
    value: utils.parseEther('1'), // 1 Ether in Wei
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92", // Recipient address
    gasLimit: 21000, // Standard gas for a simple ETH transfer
    gasPrice: utils.parseUnits('1', 'gwei'), // Setting a basic gas price (1 Gwei) as mentioned in raw tx notes
});

module.exports = signaturePromise;
