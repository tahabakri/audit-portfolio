/**
 * Find the `value` stored in the contract
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise which resolves with the `value`
 */
function getValue(contract) {
    // contract.value() comes from the ABI automatically
    // we did not write this function ourselves
    // it reads the public state variable for free (no gas cost)
    return contract.value();
}

module.exports = getValue;