// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {

    // records WHO deployed this specific contract
    // like a "birth certificate" - permanent record
    event Deployed(address owner);

    // runs ONCE at deployment
    // emits the Deployed event with the deployer's address
    constructor() {
        emit Deployed(msg.sender);
    }

}
