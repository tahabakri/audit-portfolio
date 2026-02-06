# Notes: Brute Force Hashing (Alchemy Exercise)

## The Task

I needed to find an original color input from a given SHA-256 hash.
The constraint was that the input must come from a specific list of 6 colors (Red, Green, Blue, etc).

## The Logic

Since hash functions are one-way (cannot be reversed), I cannot "decrypt" the hash.
However, because the list of possible inputs is small, I can use a "Brute Force" approach:

1. Loop through every color in the list.
2. Hash the color.
3. Compare it to the target hash.

## The Code Solution

```javascript
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const COLORS = ["red", "green", "blue", "yellow", "pink", "orange"];

function findColor(hash) {
  // Loop through list
  for (let i = 0; i < COLORS.length; i++) {
    // Convert string to bytes
    const byteColor = utf8ToBytes(COLORS[i]);

    // Hash the bytes
    const hashedColor = sha256(byteColor);

    // Compare logic
    if (toHex(hashedColor) === toHex(hash)) {
      return COLORS[i];
    }
  }
}
```

## Security Observation

This only worked because the input space was tiny (6 options).
If the input was a complex password, this loop would take millions of years.
This shows why using common words as passwords is dangerous—attackers can pre-calculate hashes (Rainbow Tables).
