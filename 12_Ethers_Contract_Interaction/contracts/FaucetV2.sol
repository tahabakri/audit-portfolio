// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract FaucetV2 {

    // stores the deployer's address as owner
    address payable public owner;

    // runs once at deployment, can receive ETH
    constructor() payable {
        owner = payable(msg.sender);
    }

    // anyone can withdraw up to 0.1 ETH at a time
    function withdraw(uint _amount) payable public {
        require(_amount <= 100000000000000000);
        (bool sent, ) = payable(msg.sender).call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    // ONLY the owner can withdraw ALL funds at once
    function withdrawAll() onlyOwner public {
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    // ONLY the owner can destroy this contract
    function destroyFaucet() onlyOwner public {
        selfdestruct(owner);
    }

    // reusable check - only owner can pass through
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}