// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Owner {

    // stores the address of whoever deployed this contract
    address public owner;

    // runs once at deployment
    // saves the deployer's address as owner
    constructor() {
        owner = msg.sender;
    }
    // runs when contract receives ETH with no extra data
    receive() external payable {}
}