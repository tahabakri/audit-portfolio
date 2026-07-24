// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Constructor {

    // stores our number, starts at whatever the deployer chooses
    uint public x;

    // runs once at deployment
    // deployer picks the starting value for x
    constructor(uint _x) {
        x = _x;
    }

    // anyone can call this - adds 1 to x every time
    function increment() external {
        x++;
    }

    // pure calculation - does not touch stored data
    // returns x plus whatever number is passed in
    function add(uint y) external view returns(uint) {
        return x + y;
    }

    // resets x back to 0
    // NOTE: no access control - anyone can call this!
    function reset() external {
        x = 0;
    }

}