const promisfy = require("./promisfy");
const ganache = require("ganache-core");

const provider = ganache.provider();

provider.send = promisfy(provider.send);

module.exports = provider;