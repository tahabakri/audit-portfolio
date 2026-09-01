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

    // transfers balance from msg.sender to another user
    function transfer(address _to, uint _amount) external {
        // sender must be an ACTIVE user
        require(users[msg.sender].isActive, "You are not an active user");

        // recipient must ALSO be an ACTIVE user
        // otherwise we'd add balance to someone who doesn't officially exist
        require(users[_to].isActive, "Recipient is not an active user");

        // sender must have ENOUGH balance to send
        require(users[msg.sender].balance >= _amount, "Insufficient balance");

        // subtract from sender, add to recipient
        users[msg.sender].balance -= _amount;
        users[_to].balance += _amount;
    }

}