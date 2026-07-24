/**
 * Find the `value` stored in the contract
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise which resolves with the `value`
 */
function getValue(contract) {
    return contract.value();
}

/**
 * Modify the `value` stored in the contract
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
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {string} friend - a string containing a hexadecimal ethereum address
 * @return {promise} a promise of the transfer transaction
 */
function transfer(contract, friend) {
    return contract.transfer(friend, 300);
}

module.exports = { getValue, setValue, transfer };