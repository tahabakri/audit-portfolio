// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Members {

    // stores who deployed this contract
    address public owner;

    // maps an address to true/false - are they a member?
    mapping(address => bool) public members;

    // sets the deployer as owner
    constructor() {
        owner = msg.sender;
    }

    // ONLY the owner can add new members now
    function addMember(address _member) external onlyOwner {
        members[_member] = true;
    }

    // reusable access control check
    modifier onlyOwner {
        require(msg.sender == owner, "Not the owner");
        _;
    }

}