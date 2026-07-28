// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract RequireDeposit {

    // stores the deployer's address - only THIS address can withdraw
    address public owner;

    // payable allows this constructor to RECEIVE ether during deployment
    // without payable, sending ETH here would fail automatically
    constructor() payable {
        // save the deployer as owner
        owner = msg.sender;

        // checks that at least 1 ether was sent
        // if msg.value is LESS than 1 ether, the whole transaction
        // reverts (cancels) and shows the error message
        require(msg.value >= 1 ether, "Must send at least 1 ether");
    }

    // only the owner can withdraw all funds
    // anyone else calling this gets reverted
    // this is the ACCESS CONTROL fix we discussed many times today!
    function withdraw() public {
        require(msg.sender == owner, "Not the owner");
        (bool success, ) = owner.call{ value: address(this).balance }("");
        require(success);
    }

}