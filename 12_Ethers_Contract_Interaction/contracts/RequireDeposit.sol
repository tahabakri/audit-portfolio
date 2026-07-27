// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract RequireDeposit {

    // payable allows this constructor to RECEIVE ether during deployment
    // without payable, sending ETH here would fail automatically
    constructor() payable {
        // checks that at least 1 ether was sent
        // if msg.value is LESS than 1 ether, the whole transaction
        // reverts (cancels) and shows the error message
        require(msg.value >= 1 ether, "Must send at least 1 ether");
    }

}