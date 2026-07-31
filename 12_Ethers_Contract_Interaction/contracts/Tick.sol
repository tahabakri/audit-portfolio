// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Tick {

    // counts how many times tick() has been called
    uint public counter;

    // increases counter by 1 each time called
    // once counter reaches 10, destroys the contract
    function tick() external {
        counter++;
        if(counter == 10) {
            selfdestruct(payable(msg.sender));
        }
    }

}