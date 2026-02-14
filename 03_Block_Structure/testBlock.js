const Block = require('./Block');
const assert = require('assert');

console.log("Running Block Test...");

const newBlock = new Block();
const hash = newBlock.toHash();

console.log("Generated Hash:", hash);

try {
    assert(/^[0-9A-F]{64}$/i.test(hash));
    console.log("Test Passed: Hash is a valid 64-character hexadecimal string.");
} catch (err) {
    console.error("Test Failed: Hash is invalid!");
    process.exit(1);
}
