// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {

    // A boolean (true/false) variable called 'a'
    // public = anyone can read this value
    // We set it to true by default
    bool public a = true;

    // A boolean variable called 'b'
    // We set it to false by default
    // Security Note: even private variables can be read
    // on-chain by anyone reading raw blockchain storage.
    // Never store sensitive data on-chain.
    bool public b = false;

}