// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract DynamicArraySum {
    function sum(uint[] calldata numbers) external pure returns (uint) {
        uint total = 0;
        for(uint i = 0; i < numbers.length; i++) {
            total += numbers[i];
        }
        return total;
    }
}