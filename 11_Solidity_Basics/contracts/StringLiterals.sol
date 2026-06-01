// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract StringLiterals {

    // bytes32 = fixed size 32 bytes — cheaper to store
    // Good for short strings under 32 bytes
    // Security: storing sensitive text on-chain is visible to everyone
    bytes32 public msg1 = "Hello World";

    // string = dynamic size — can hold any length
    // More expensive than bytes32
    // Use for long human-readable text
    string public msg2 = "Hi, its me i was wondering if you exist";

}