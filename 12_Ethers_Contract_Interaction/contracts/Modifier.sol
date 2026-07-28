// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Modifier {
    address owner;
    uint configA;
    uint configB;
    uint configC;

    constructor() {
        owner = msg.sender;
    }

    function setA(uint _configA) public onlyOwner {
        configA = _configA;
    }

    function setB(uint _configB) public onlyOwner {
        configB = _configB;
    }

    function setC(uint _configC) public onlyOwner {
        configC = _configC;
    }

    // reusable check - only the owner can run functions using this modifier
    // _ means "run the function body here"
    modifier onlyOwner {
        require(msg.sender == owner, "Not the owner");
        _;
    }
}