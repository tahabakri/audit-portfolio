const Block = require('./Block');

class Blockchain {
    constructor() {
        // Create the First Block (Genesis)
        // We put a string inside it just to give it data
        this.chain = [ new Block("Genesis Block") ];
    }
}

module.exports = Blockchain;