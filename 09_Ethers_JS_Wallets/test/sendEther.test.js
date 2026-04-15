const { assert } = require('chai');
const sendEther = require('../sendEther');
const ethers = require('ethers');
const { ganacheProvider } = require('../config');

const provider = new ethers.providers.Web3Provider(ganacheProvider);
let tx;

describe('sendEther', () => {
    before(async () => {
        tx = await sendEther({
            value: ethers.utils.parseEther("1.0"),
            to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
        });
    })
    it('should resolve with a transaction', async () => {
        assert(tx, "The function did not resolve with a transaction. Did you return the transaction promise?")
        assert.equal(tx.to, "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92");
        assert.equal(tx.from, "0x5409ED021D9299bf6814279A6A1411A7e866A631");
        assert(tx.hash);
    });
    it('should get mined', async () => {
        // Wait for the transaction to be mined by ganache
        const receipt = await provider.waitForTransaction(tx.hash);
        assert(receipt);
        // In ganache, the first tx is block 1 (block 0 is genesis)
        assert.equal(receipt.blockNumber, 1);
    });
});
