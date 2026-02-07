const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hash_message');

// AUDITOR WARNING: NEVER hardcode real private keys in code!
// This is for learning purposes only.
const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
    // Step 1: Turn the message into a Hash (Fingerprint)
    const messageHash = hashMessage(msg);

    // Step 2: Sign the Hash using the Private Key
    const sig = secp256k1.sign(messageHash, PRIVATE_KEY);

    // Return in the format expected by index.js: [bytes, recoveryBit]
    return [sig.toCompactRawBytes(), sig.recovery];
}

module.exports = signMessage;