const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('FaucetV2', function () {

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

    it('should fail when a non-owner tries to withdrawAll', async function () {
        const { faucet, other } = await loadFixture(deployContractAndSetVariables);
        await expect(faucet.connect(other).withdrawAll()).to.be.reverted;
    });

    it('should fail when a non-owner tries to destroyFaucet', async function () {
        const { faucet, other } = await loadFixture(deployContractAndSetVariables);
        await expect(faucet.connect(other).destroyFaucet()).to.be.reverted;
    });

    it('should destroy the contract when owner calls destroyFaucet', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    const faucetAddress = await faucet.getAddress();
    await faucet.connect(owner).destroyFaucet();
    const bytecode = await ethers.provider.getCode(faucetAddress);
    expect(bytecode).to.equal("0x");
    });

    

});