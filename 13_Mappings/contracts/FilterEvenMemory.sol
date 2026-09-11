// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract FilterEvenMemory {
    function filterEven(uint[] calldata numbers) external pure returns (uint[] memory) {
        // first pass - count how many even numbers exist
        uint elements;
        for(uint i = 0; i < numbers.length; i++) {
            if(numbers[i] % 2 == 0) {
                elements++;
            }
        }

        // create a memory array of EXACTLY that size
        uint[] memory filtered = new uint[](elements);
        uint filledIndex = 0;

        // second pass - fill the array with the even numbers
        for(uint i = 0; i < numbers.length; i++) {
            if(numbers[i] % 2 == 0) {
                filtered[filledIndex] = numbers[i];
                filledIndex++;
            }
        }

        return filtered;
    }
}