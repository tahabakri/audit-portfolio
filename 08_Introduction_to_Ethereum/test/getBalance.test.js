const { assert } = require('chai');
const getNonce = require('../getNonce');
const provider = require('../provider');

describe('getNonce', () => {
    let address;

    before(async () => {
        const accounts = await provider.send({
            id: 1,
            jsonrpc: "2.0",
            method: "eth_accounts"
        });
        address = accounts.result[0];
    });

    it('should get the nonce', async () => {
        const nonce = await getNonce(address);
        assert.equal(nonce, 0);
    });

    describe('after sending a transaction', () => {
        before(() => {
            return provider.send({ 
                id: 1, 
                jsonrpc: "2.0",
                method: "eth_sendTransaction", 
                params: [{ 
                    from: address, 
                    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567", 
                    value: "0x1" 
                }]
            });
        });

        it('should get the nonce', async () => {
            const nonce = await getNonce(address);
            assert.equal(nonce, 1);
        });
    });
});