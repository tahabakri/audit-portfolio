// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    // The exact ETH amount each person must pay to RSVP.
    // Set once when the contract is deployed.
    uint256 public deposit;

    // Tracks whether a specific address already RSVP'd.
    // Example:
    // hasRSVPed[Alice] = true
    // Useful for preventing the same wallet from joining twice.
    mapping(address => bool) public hasRSVPed;

    // Stores the actual list of everyone who RSVP'd.
    // We need this because mappings cannot give us a list of all their keys.
    address[] public attendees;

    // Runs once during deployment.
    // "amount" becomes the required RSVP deposit.
    constructor(uint256 amount) {
        deposit = amount;
    }

    // external = called from outside the contract
    // payable = caller is allowed to send ETH
    function rsvp() external payable {
        // Caller must send EXACTLY the required deposit.
        require(msg.value == deposit, "Wrong deposit");

        // The same wallet cannot RSVP twice.
        require(!hasRSVPed[msg.sender], "Already RSVP'd");

        // Record that this caller has joined.
        hasRSVPed[msg.sender] = true;

        // Add the caller to the full attendee list.
        attendees.push(msg.sender);
    }

    // Pays the venue and distributes any remaining ETH evenly among all attendees.
    function payBill(address venue, uint amount) external {
        // Ensure there is at least one attendee to prevent division by zero.
        require(attendees.length > 0, "No attendees");

        // Send the bill amount to the venue using low-level call.
        (bool venuePaid, ) = payable(venue).call{value: amount}("");
        require(venuePaid, "Venue payment failed");

        // Check how much ETH remains in the contract after paying the venue.
        uint remaining = address(this).balance;

        // Calculate each attendee's equal share of the leftover funds.
        uint share = remaining / attendees.length;

        // Loop through the attendee list and refund each person their share.
        for (uint i = 0; i < attendees.length; i++) {
            (bool refunded, ) = payable(attendees[i]).call{value: share}("");
            require(refunded, "Refund failed");
        }
    }
}