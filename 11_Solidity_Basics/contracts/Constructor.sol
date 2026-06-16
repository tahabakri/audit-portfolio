// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Constructor {

    // state variable to store the number
    // set by whoever deploys the contract
    uint public x;

    // constructor runs once at deployment
    // _x is the number the deployer passes in
    // we store it in x
    constructor(uint _x) {
        x = _x;
    }

}