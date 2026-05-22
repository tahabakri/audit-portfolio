const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

let cachedNonce = null;

async function donate(privateKey, charities) {
    const wallet = new Wallet(privateKey, provider);

    if (cachedNonce === null) {
        cachedNonce = await provider.getTransactionCount(wallet.address, 'pending');
    }

    const startNonce = cachedNonce;
    cachedNonce += charities.length;

    await Promise.all(charities.map((charity, i) =>
        wallet.sendTransaction({
            to: charity,
            value: utils.parseEther("1.0"),
            nonce: startNonce + i,
        })
    ));
}

module.exports = donate;
