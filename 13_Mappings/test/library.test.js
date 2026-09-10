const { ethers } = require('hardhat');
const { assert, expect } = require('chai');

describe('Library', function () {
    let contract, owner, other;

    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("Library");
        contract = await Contract.deploy();
        await contract.waitForDeployment();

        const signers = await ethers.getSigners();
        owner = signers[0];
        other = signers[1];
    });

    it('should add a book', async () => {
        await contract.connect(owner).addBook("The Hobbit", "Tolkien");
        const [title, author] = await contract.get(0);
        assert.equal(title, "The Hobbit");
        assert.equal(author, "Tolkien");
    });

    it('should allow the registrant to update a book', async () => {
        await contract.connect(owner).addBook("Old Title", "Old Author");
        await contract.connect(owner).update(0, "New Title", "New Author");
        const [title, author] = await contract.get(0);
        assert.equal(title, "New Title");
        assert.equal(author, "New Author");
    });

    it('should NOT allow a non-registrant to update a book', async () => {
        await contract.connect(owner).addBook("Some Title", "Some Author");
        await expect(contract.connect(other).update(0, "Hacked", "Hacked")).to.be.reverted;
    });
});