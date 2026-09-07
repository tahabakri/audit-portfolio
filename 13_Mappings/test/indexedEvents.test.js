const { assert } = require('chai');

describe('Collectible - Indexed Events', function () {
    let artifacts;
    before(async () => {
        artifacts = await hre.artifacts.readArtifact("Collectible");
    });
    
    it('should have indexed the Deployed event address', () => {
        const deployedEvent = artifacts.abi.find(x => x.name === "Deployed");
        assert(deployedEvent, "Expected to find a Deployed event!");
        const { inputs } = deployedEvent;
        assert.equal(inputs.length, 1);
        assert(inputs[0].indexed, "Expected the address input to be indexed!");
    });
    
    it('should have indexed the Transfer event addresses', () => {
        const transferEvent = artifacts.abi.find(x => x.name === "Transfer");
        assert(transferEvent, "Expected to find a Transfer event!");
        const { inputs } = transferEvent;
        assert.equal(inputs.length, 2);
        assert(inputs[0].indexed);
        assert(inputs[1].indexed);
    });

    it('should have indexed the Purchase event address', () => {
        const purchaseEvent = artifacts.abi.find(x => x.name === "Purchase");
        assert(purchaseEvent, "Expected to find a Purchase event!");
        const { inputs } = purchaseEvent;
        assert.equal(inputs.length, 2);
        assert(inputs[1].indexed);
    });
});
