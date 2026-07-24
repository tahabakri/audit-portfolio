// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Faucet {

    // Anyone can withdraw up to 0.1 ETH at a time
    // VULNERABILITY: no limit on how many times this can be called!
    function withdraw(uint _amount) public {
        require(_amount <= 100000000000000000);
        payable(msg.sender).transfer(_amount);
    }

    // Allows the contract to RECEIVE plain ETH transfers
    // (someone sending ETH directly, not calling a function)
    receive() external payable {}
}