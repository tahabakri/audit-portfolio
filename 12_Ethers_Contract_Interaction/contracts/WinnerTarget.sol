// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract WinnerTarget {
    event Winner(address);

    // this is the ORIGINAL puzzle contract we're trying to "solve"
    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}