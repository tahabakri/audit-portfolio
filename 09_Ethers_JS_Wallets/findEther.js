const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

async function findEther(address) {
    
    // Get the latest block number so we know how many blocks to search
    const blockNumber = await provider.getBlockNumber();
    
    // Empty array to collect all addresses that received ether
    const addresses = [];
    
    // Loop through every block starting at 1 (block 0 is genesis - no transactions)
    for(let i = 1; i <= blockNumber; i++) {
        const block = await provider.getBlockWithTransactions(i);
        
        // Loop through every transaction inside this block
        for(const tx of block.transactions) {
            
            // Compare sender address - toLowerCase() handles uppercase/lowercase differences
            if(tx.from.toLowerCase() === address.toLowerCase()) {
                addresses.push(tx.to); // collect the receiver address
            }
        }
    }
    
    // Return all addresses that received ether from our sender
    return addresses;
}

module.exports = findEther;