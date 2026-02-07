const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    // 1. Remove the first byte (The "Format" byte)
    // We start at index 1 and take everything else
    const keyWithoutFormat = publicKey.slice(1);

    // 2. Hash the remaining bytes
    const hash = keccak256(keyWithoutFormat);

    // 3. Take the last 20 bytes of the hash
    // (Negative 20 means "start 20 from the end")
    const address = hash.slice(-20);

    // 4. Return the address
    return address;
}

module.exports = getAddress;