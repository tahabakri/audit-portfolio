class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute() {
        for (let i = 0; i < this.inputUTXOs.length; i++) {
            const coin = this.inputUTXOs[i];

            if (coin.spent) {
                throw new Error("Double Spend Attempt: This coin is already spent!");
            }
            coin.spend();
        }
    }
}
 module.exports = Transaction;