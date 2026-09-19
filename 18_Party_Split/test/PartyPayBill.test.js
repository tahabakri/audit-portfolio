const { assert } = require('chai');
const { parseEther } = ethers;

describe('Party: Pay the Bill', () => {
    const deposit = parseEther("2");
    let contract;
    let attendees;
    let venue;

    beforeEach(async () => {
        const signers = await ethers.getSigners();
        attendees = signers.slice(1, 5); // 4 attendees
        venue = signers[9];

        const Party = await ethers.getContractFactory('Party');
        contract = await Party.deploy(deposit);

        for (let i = 0; i < attendees.length; i++) {
            await contract.connect(attendees[i]).rsvp({ value: deposit });
        }
    });

    it('should pay the venue the bill amount', async () => {
        const bill = parseEther("4");
        const initialVenueBalance = await ethers.provider.getBalance(venue.address);

        await contract.payBill(venue.address, bill);

        const finalVenueBalance = await ethers.provider.getBalance(venue.address);
        assert.equal(finalVenueBalance, initialVenueBalance + bill);
    });

    it('should refund all attendees equally (1 ether each for a 4 ether bill)', async () => {
        const bill = parseEther("4");
        const previousBalances = [];
        for (let i = 0; i < attendees.length; i++) {
            previousBalances.push(await ethers.provider.getBalance(attendees[i].address));
        }

        // Caller is signers[0] (default), not one of the attendees, so attendees spend 0 gas
        await contract.payBill(venue.address, bill);

        for (let i = 0; i < attendees.length; i++) {
            const currentBalance = await ethers.provider.getBalance(attendees[i].address);
            assert.equal(currentBalance, previousBalances[i] + parseEther("1"));
        }
    });

    it('should refund all attendees equally (1.5 ether each for a 2 ether bill)', async () => {
        const bill = parseEther("2");
        const previousBalances = [];
        for (let i = 0; i < attendees.length; i++) {
            previousBalances.push(await ethers.provider.getBalance(attendees[i].address));
        }

        await contract.payBill(venue.address, bill);

        for (let i = 0; i < attendees.length; i++) {
            const currentBalance = await ethers.provider.getBalance(attendees[i].address);
            assert.equal(currentBalance, previousBalances[i] + parseEther("1.5"));
        }
    });
});
