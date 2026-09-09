/**
 * Approves the Escrow, signed by the arbiter
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {ethers.types.Signer} arbiterSigner - the arbiter EOA
 * 
 * @return {promise} a promise of the approve transaction
 */
function approve(contract, arbiterSigner) {
    // .connect(signer) returns a new Contract instance connected to the arbiter's account
    // This ensures msg.sender in the smart contract is the arbiter (who has authorization to approve)
    // .approve() sends the state-changing transaction to call the approve() function on-chain
    return contract.connect(arbiterSigner).approve();
}

module.exports = approve;