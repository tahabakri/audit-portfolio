// ============================================
// This file connects JavaScript to our Solidity contracts
// Each function uses ethers.js to call a contract function
// ============================================

const { ethers } = require('ethers');

/**
 * Find the `value` stored in the contract
 * This is a READ — costs no gas, changes nothing
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise which resolves with the `value`
 */
function getValue(contract) {
    return contract.value();
}

/**
 * Modify the `value` stored in the contract
 * This is a WRITE — costs gas, changes contract storage
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise of transaction
 */
function setValue(contract) {
    return contract.modify(42);
}

/**
 * Transfer funds on the contract from the current signer 
 * to the friends address
 * Uses the DEFAULT signer already connected to the contract
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {string} friend - a string containing a hexadecimal ethereum address
 * @return {promise} a promise of the transfer transaction
 */
function transfer(contract, friend) {
    return contract.transfer(friend, 300);
}

/**
 * Set the message on the contract using the signer passed in
 * .connect(signer) SWITCHES which wallet is calling the function
 * Needed here because the OWNER is blocked from calling modify()
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {ethers.types.Signer} signer - ethers.js signer instance
 * @return {promise} a promise of transaction modifying the `message`
 */
function setMessage(contract, signer) {
    return contract.connect(signer).modify("Hello");
}

/**
 * Deposit at least 1 ether into the contract 
 * payable = the function can RECEIVE ether
 * We attach ether using the {value: ...} object as last argument
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise of the deposit transaction 
 */
function deposit(contract) {
    return contract.deposit({
        value: ethers.parseEther("1")
    });
}

// Export ALL functions together — only ONE module.exports allowed per file
module.exports = { getValue, setValue, transfer, setMessage, deposit };