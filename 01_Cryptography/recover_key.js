const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hash_message");

/**
 * Recover the public key from a signed message.
 * 
 * @param {string} message - The original message that was signed
 * @param {Uint8Array} signature - The signature bytes from signMessage
 * @param {number} recoveryBit - The recovery bit from signMessage
 * @returns {Uint8Array} publicKey - The recovered public key
 */
async function recoverKey(message, signature, recoveryBit) {
    // 1️⃣ Hash the message first
    const hash = hashMessage(message);

    // 2️⃣ Recover the Public Key base on ethereum-cryptography v3 API
    const fullSignature = secp256k1.Signature.fromCompact(signature).addRecoveryBit(recoveryBit);
    const publicKey = fullSignature.recoverPublicKey(hash).toRawBytes();

    // 3️⃣ Return the recovered public key
    return publicKey;
}

module.exports = recoverKey;
