const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * 💡 Final Stage: Charitable Donations
 * 
 * Donate at least 1 ether from the wallet to each charity in the array.
 */
async function donate(privateKey, charities) {
    const wallet = new Wallet(privateKey, provider);

    // Sequential awaits ensure Ganache processes nonces correctly.
    for (const charityAddress of charities) {
        await wallet.sendTransaction({
            to: charityAddress,
            value: utils.parseEther("1.0"),
        });
        // Small delay to allow Ganache to update the account nonce accurately
        await new Promise(resolve => setTimeout(resolve, 150));
    }
}

module.exports = donate;
