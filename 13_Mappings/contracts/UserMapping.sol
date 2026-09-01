// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract UserMapping {

    // groups TWO values together for EACH user
    struct User {
        uint balance;
        bool isActive;
    }

    // maps an address to their ENTIRE User struct (balance + isActive)
    mapping(address => User) public users;

    // creates a new user for whoever calls this function
    function createUser() external {
        // prevent the SAME address from creating a user TWICE
        require(users[msg.sender].isActive == false, "User already exists");

        // give the new user 100 starting tokens
        users[msg.sender].balance = 100;

        // mark them as active
        users[msg.sender].isActive = true;
    }

}