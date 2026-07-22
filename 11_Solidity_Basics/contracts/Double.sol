// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Double {

    // double = function name
    // takes one uint parameter called x
    // external = only callable from outside the contract
    // pure = does not read or change any stored data
    // returns(uint) = will give back a number
    function double(uint x) external pure returns(uint) {
        // multiplies x by 2 and gives back the answer
        // example: if x = 5, this returns 10
        return x * 2;
    }
    
    // function with two parameters
    // returns two numbers
    // each number is x * 2 and y * 2
    function double(uint x, uint y) external pure returns(uint, uint) {
        return (x * 2, y * 2);
    }

}