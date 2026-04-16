const { assert } = require('chai');
const findMyBalance = require('../findMyBalance')
const { PRIVATE_KEY, INITIAL_BALANCE } = require('../config');

describe('findMyBalance', () => {
    it('should return an instance of Promise', () => {
        assert(findMyBalance(PRIVATE_KEY) instanceof Promise);
    });
    it('should resolve with a balance close to the initial one', async () => {
        const balance = await findMyBalance(PRIVATE_KEY);
        // We use isAtMost because the account might have spent gas in previous tests
        assert.isAtMost(+balance.toString(), +INITIAL_BALANCE.toString(), "Balance should not exceed initial balance");
        assert.isAtLeast(+balance.toString(), +INITIAL_BALANCE.div(2).toString(), "Balance should still be significant");
    });
});
