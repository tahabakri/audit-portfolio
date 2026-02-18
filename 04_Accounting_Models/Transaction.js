class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
   execute() {
        // --- STAGE 1: COUNTING ---
        let totalInput = 0;
        for (let i = 0; i < this.inputUTXOs.length; i++) {
            totalInput += this.inputUTXOs[i].amount;
        }

        let totalOutput = 0;
        for (let i = 0; i < this.outputUTXOs.length; i++) {
            totalOutput += this.outputUTXOs[i].amount;
        }

        // --- STAGE 2: ACCOUNTING CHECK ---
        if (totalInput < totalOutput) {
            throw new Error("Insufficient funds!");
        }

        // --- STAGE 3: THE POLICE CHECK (Check ALL first) ---
        for (let i = 0; i < this.inputUTXOs.length; i++) {
            if (this.inputUTXOs[i].spent) {
                throw new Error("One of the coins is already spent!");
            }
        }

        // --- STAGE 4: THE ACTION (Only happens if STAGE 1, 2, and 3 pass) ---
        for (let i = 0; i < this.inputUTXOs.length; i++) {
            this.inputUTXOs[i].spend();
        }

        this.fee = totalInput - totalOutput;

    }
}
module.exports = Transaction;