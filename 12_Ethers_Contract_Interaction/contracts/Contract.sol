// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {

    // public value = anyone can read it for free
    // this creates an automatic getter function value()
    uint public value;

    // constructor runs once at deployment
    // deployer decides the starting value
    constructor(uint _value) {
        value = _value;
    }

}