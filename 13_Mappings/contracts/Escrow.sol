// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Escrow {

    // the person who deposited the funds (set automatically to whoever deploys)
    address public depositor;

    // the person who receives the funds once approved
    address public beneficiary;

    // the ONLY address allowed to approve the release of funds
    address public arbiter;

    // tracks whether the arbiter has approved the release yet
    bool public isApproved;

    // fires once, when the arbiter approves and releases funds
    event Approved(uint amount);

    // runs ONCE at deployment
    // payable = allows ETH to be sent along with deployment (the deposit)
    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
        isApproved = false;
    }

    // ONLY the arbiter can call this - releases ALL funds to beneficiary
    function approve() external {
        require(msg.sender == arbiter, "Only arbiter can approve");

        // check how much ETH the contract currently holds
        uint256 balance = address(this).balance;

        // send that ENTIRE balance to the beneficiary
        (bool success, ) = beneficiary.call{value: balance}("");
        require(success, "Failed to send money");

        // permanently mark as approved
        isApproved = true;

        // log this event so front-end apps can react to it
        emit Approved(balance);
    }
}