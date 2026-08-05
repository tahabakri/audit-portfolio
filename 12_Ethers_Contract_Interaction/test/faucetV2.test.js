const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('FaucetV2', function () {

    // reusable setup function - loadFixture reuses this efficiently
    // instead of redeploying manually in every single test
    async function deployContractAndSetVariables() {
        const Faucet = await ethers.getContractFactory('FaucetV2');
        const faucet = await Faucet.deploy();

        const [owner, other] = await ethers.getSigners();

        let withdrawAmount = ethers.parseUnits('1', 'ether');

        return { faucet, owner, other, withdrawAmount };
    }

    it('should deploy and set the owner correctly', async function () {
        const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
        expect(await faucet.owner()).to.equal(owner.address);
    });

    it('should not allow withdrawals above .1 ETH at a time', async function () {
        const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
        await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
    });

});