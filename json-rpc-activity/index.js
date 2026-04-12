const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "https://eth-mainnet.g.alchemy.com/v2/Z1Ra3M2DhsGswKjFOBIeR";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance", // The new question
  params: [
    "0xe6a7a1d47ff21b6321162aea7c6cb457d5476bca", // The Miner's address
    "latest" // Point in time
  ]
}).then((response) => {
  // 1. Convert Hex string to a Number
  const balanceInWei = parseInt(response.data.result);
  
  // 2. Divide by 10^18 to get the ETH value
  const balanceInETH = balanceInWei / 10**18;

  console.log("Balance in Wei:", balanceInWei);
  console.log("Balance in ETH:", balanceInETH);
});