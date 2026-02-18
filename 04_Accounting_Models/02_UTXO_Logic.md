# Anatomy of a UTXO (A "Coin")

A UTXO is an object that represents money waiting to be spent. It usually has:
1. **Owner:** The Public Key/Address allowed to spend it.
2. **Amount:** How much it is worth.
3. **Spent Status:** A boolean (True/False) to track if it's been used.

## The Life of a Coin
1. **Genesis:** Created by a transaction.
2. **Unspent:** Sits in the "UTXO Pool" (the database of available money).
3. **Spent:** Used as an "Input" for a new transaction. It is then removed from the pool forever.