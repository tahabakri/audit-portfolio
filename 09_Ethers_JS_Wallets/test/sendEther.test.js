const { assert } = require('chai');
const sendEther = require('../sendEther');
const ethers = require('ethers');
const { ganacheProvider } = require('../config');

const provider = new ethers.providers.Web3Provider(ganacheProvider);

describe('sendEther - Multiple Transactions', () => {
    it('should have mined exactly three blocks during this test', async () => {
        const startBlock = await provider.getBlockNumber();
        const props = {
            value: ethers.utils.parseEther("1.0"),
            to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
        }
        
        // Sequential awaits to ensure block production is captured accurately
        await sendEther(props);
        await sendEther(props);
        await sendEther(props);
        
        const endBlock = await provider.getBlockNumber();
        const diff = endBlock - startBlock;
        assert.equal(diff, 3, `Expected a difference of 3 blocks but got ${diff}`);
    });
});
