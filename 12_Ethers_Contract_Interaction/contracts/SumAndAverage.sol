// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SumAndAverage {
    function sumAndAverage(uint x, uint y, uint z, uint w) external pure returns(uint, uint) {
        uint sum = x + y + z + w;
        uint average = sum / 4;
        return (sum, average);
    }
}