//Brute Force Hashing excercise: Given a hash, find the original color string that produces it using SHA-256.

const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

function findColor(hash) {
    // Loop through each possible color to find a match
    for (let i = 0; i < COLORS.length; i++) {
        
        // Convert the color string to bytes
        const byteColor = utf8ToBytes(COLORS[i]);

        // Hash the bytes
        const hashedColor = sha256(byteColor);

        // Compare the hash with the input hash
        // We convert both to hex strings to ensure they match correctly
        if (toHex(hashedColor) === toHex(hash)) {
            return COLORS[i];
        }
    }
}

module.exports = findColor;