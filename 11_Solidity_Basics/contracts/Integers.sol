// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Integers {

    // uint8 can hold 0 to 255
    // Security: if this exceeds 255 — transaction reverts
    uint8 public a = 0;

    // uint16 can hold 0 to 65535
    // Must be at least 256
    uint16 public b = 300;

    // uint256 is the largest uint — safe to store any sum
    // Auditor note: always use large enough type for sums
    // to prevent overflow
    uint256 public sum = a + b;

}