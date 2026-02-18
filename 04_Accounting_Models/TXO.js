class TXO {
    constructor(owner, amount) {
        this.owner = owner;
        this.amount = amount;
        this.spent = false;
    }
    spend() {
        if (this.spent) {
            throw new Error("Double Spend Attempt: This coin is already spent!");
        }
        this.spent = true;
    }
}

module.exports = TXO;