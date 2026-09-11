// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract FilterEven {

    // storage array - permanently holds all even numbers found
    // grows automatically as we push new values
    uint[] public evenNumbers;

    // checks each number in the input array
    // if it's even, adds it to the evenNumbers storage array
    function filterEven(uint[] calldata numbers) external {
        for(uint i = 0; i < numbers.length; i++) {
            // % is modulo - gives the remainder after division
            // if remainder is 0 when divided by 2, the number is even
            if(numbers[i] % 2 == 0) {
                evenNumbers.push(numbers[i]);
            }
        }
    }
}