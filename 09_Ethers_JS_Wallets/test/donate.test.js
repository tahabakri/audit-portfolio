const { assert } = require('chai');
const donate = require('../donate');
const { PRIVATE_KEY, ganacheProvider } = require('../config');

const ethers = require('ethers');
const provider = new ethers.providers.Web3Provider(ganacheProvider);

const charities = [
    '0xBfB25955691D8751727102A59aA49226C401F8D4',
    '0xd364d1F83827780821697C787A53674DC368eC73',
    '0x0df612209f74E8Aa37432c14F88cb8CD2980edb3',
]

describe('donate', function() {
    this.timeout(10000); // Increase timeout to 10s for multiple transactions

    it('should return an instance of Promise', () => {
        const donationPromise = donate(PRIVATE_KEY, charities);
        assert(donationPromise instanceof Promise);
    });
    
    it('should increase the balance of each charity', async () => {
        // Fetch starting balances
        const startBalances = await Promise.all(charities.map(c => provider.getBalance(c)));
        
        await donate(PRIVATE_KEY, charities);
        
        for(let i = 0; i < charities.length; i++) {
            const charity = charities[i];
            const balance = await provider.getBalance(charity);
            const expectedMin = startBalances[i].add(ethers.utils.parseEther("1.0"));
            assert(balance.gte(expectedMin), `Charity ${charity} did not receive enough ETH`);
        }
    });
});
