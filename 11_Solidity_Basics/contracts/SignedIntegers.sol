// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SignedIntegers {

    // int8 = signed integer with 8 bits
    // Range: -128 to 127 (includes negative and positive)
    // We pick 5 — a positive number within the int8 range
    int8 public a = 5;

    // int8 can hold negative numbers unlike uint8
    // We pick -3 to satisfy the requirement:
    // one variable must be positive, one must be negative
    int8 public b = -3;

    // We cast a and b to int16 before subtracting
    // because the result can exceed int8 range
    // Example: 127 - (-128) = 255 which overflows int8
    // int16 range is -32768 to 32767 — safely holds the result
    // Security: always use a large enough type for calculations
    int16 public difference = int16(a) - int16(b);

}