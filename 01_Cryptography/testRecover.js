const signMessage = require("./sign_message");
const recoverKey = require("./recover_key");
const { toHex } = require("ethereum-cryptography/utils");

async function testRecover() {
    const message = "hello world";

    // 1. Sign the message first
    const [signature, recoveryBit] = await signMessage(message);

    // 2. Recover the public key from the signature
    const publicKey = await recoverKey(message, signature, recoveryBit);

    // 3. Show it in hex
    console.log("Recovered Public Key:", toHex(publicKey));
}

testRecover();
