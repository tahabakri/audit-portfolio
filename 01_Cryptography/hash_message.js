const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    // 1. Turn the string into bytes (0s and 1s)
    const bytes = utf8ToBytes(message);
    // 2. Hash the bytes using KECCAK-256 (Not SHA!)
    const hash = keccak256(bytes);
    // 3. Return the hash
    return hash;
}
module.exports = hashMessage;

//keccak256 returns bytes (Uint8Array), not a string. Hex is only for display.
