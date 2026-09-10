// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ArraySum {
    function sum(uint[5] calldata numbers) external pure returns (uint) {
        uint total = 0;
        for(uint i = 0; i < 5; i++) {
            total += numbers[i];
        }
        return total;
    }
}