// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Members {

    // stores the address that deployed this contract
    // this address gets special permissions (see onlyOwner below)
    address public owner;

    // maps an address to true/false - are they a member?
    // public = auto-creates a getter (members(address) => bool)
    mapping(address => bool) public members;

    // runs ONCE at deployment
    // saves whoever deployed the contract as the owner
    constructor() {
        owner = msg.sender;
    }

    // adds a new member - but ONLY the owner can call this
    // onlyOwner modifier runs its check BEFORE this function's body
    function addMember(address _member) external onlyOwner {
        members[_member] = true;
    }

    // manually written getter function
    // does the SAME thing as the auto-generated members(address) getter
    // useful practice for when a mapping is PRIVATE instead of public
    function isMember(address _addr) external view returns(bool) {
        return members[_addr];
    }

    // REUSABLE access control check
    // any function using "onlyOwner" runs THIS check first
    // if msg.sender is NOT owner, the whole transaction reverts
    // the _ symbol means "now run the actual function body"
    modifier onlyOwner {
        require(msg.sender == owner, "Not the owner");
        _;
    }

}