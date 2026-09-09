const ethers = require('ethers');

/**
 * Deploys the Escrow contract with a 1 ether deposit
 *
 * @param {array} abi - interface for the Escrow contract (tells ethers.js what functions exist)
 * @param {string} bytecode - compiled EVM code for the Escrow contract
 * @param {ethers.types.Signer} signer - the depositor's wallet (pays for deployment + deposit)
 * @param {string} arbiterAddress - address that will be allowed to approve
 * @param {string} beneficiaryAddress - address that will receive funds once approved
 *
 * @return {promise} a promise that resolves once deployment completes
 */
function deploy(abi, bytecode, signer, arbiterAddress, beneficiaryAddress) {
    // ContractFactory bundles everything needed to deploy a NEW contract instance
    const factory = new ethers.ContractFactory(abi, bytecode, signer);

    // deploy() sends the deployment transaction
    // constructor arguments come first, then an overrides object
    // {value: ...} attaches 1 ETH to the deployment (the deposit)
    return factory.deploy(arbiterAddress, beneficiaryAddress, { value: ethers.parseEther("1") });
}

module.exports = deploy;