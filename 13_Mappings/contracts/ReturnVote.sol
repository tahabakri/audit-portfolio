// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// needed to use structs as return types / calldata in older Solidity
// (no longer needed in 0.8.x - safe to keep or remove)
pragma experimental ABIEncoderV2;

contract ReturnVote {

    // gives names to possible vote options (Yes = 0, No = 1)
    enum Choices { Yes, No }

    // groups a choice with who made it
    struct Vote {
        Choices choice;
        address voter;
    }

    // creates and RETURNS a Vote struct directly - does NOT save it
    // memory = temporary, only exists for this function call
    // view = reads msg.sender but doesn't change any stored state
    function createVote(Choices choice) external view returns (Vote memory) {
        return Vote(choice, msg.sender);
    }
}