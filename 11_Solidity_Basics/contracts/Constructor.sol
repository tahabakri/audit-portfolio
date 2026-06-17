// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Constructor {

    // state variable to store the number
    uint public x;

    // constructor runs once at deployment
    // deployer passes in the starting value
    constructor(uint _x) {
        x = _x;
    }

    // anyone outside can call this function
    // it adds 1 to x every time it is called
    function increment() external {
        x++;
    }

    function add(uint y) external view returns (uint) {
        return x + y;
    }

}