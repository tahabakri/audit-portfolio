const signMessage = require("./01_Cryptography/sign_message");
const { toHex } = require("ethereum-cryptography/utils");

async function run() {
  const [signature, recoveryBit] = await signMessage("hello world");

  console.log("Signature:", toHex(signature));
  console.log("Recovery bit:", recoveryBit);
}

run();
