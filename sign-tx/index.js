const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
require('dotenv').config();

// This line "reaches into" your .env file to grab the secrets
const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const settings = {
  apiKey: TEST_API_KEY,
  network: Network.ETH_SEPOLIA,
};

// 1. Create the Connection (The Clerk)
const alchemy = new Alchemy(settings);

// 2. Create the Signer (The Pen)
const wallet = new Wallet(TEST_PRIVATE_KEY);

async function main() {
  // 1. Get the current Nonce (How many txs have I sent?)
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    'latest'
  );

  // 2. Build the "Work Order" (The Transaction)
  let transaction = {
    to: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", // Sending to my burner address
    value: Utils.parseEther('0.001'), // Sending a tiny bit of ETH
    gasLimit: '21000',
    maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
    maxFeePerGas: Utils.parseUnits('20', 'gwei'),
    nonce: nonce,
    type: 2,
    chainId: 11155111, // This is the ID for Sepolia
  };

  // 3. Sign the transaction (Apply the Pen)
  let rawTransaction = await wallet.signTransaction(transaction);
  
  // 4. Send the signed package to the Network (Clerk)
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  
  console.log("BOOM! Transaction sent!");
  console.log(`Check it here: https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main();