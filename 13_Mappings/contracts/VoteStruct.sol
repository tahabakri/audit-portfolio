// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract VoteStruct {

    // gives names to the possible vote options
    // Yes = 0, No = 1 under the hood
    enum Choices { Yes, No }

    // custom data type grouping a choice with WHO made it
    struct Vote {
        Choices choice; // which option was picked
        address voter;  // who picked it
    }

    // holds the CURRENT vote (only one at a time in this simple version)
    Vote public vote;

    // creates a new vote using the passed-in choice and msg.sender
    // positional initialization: Vote(choice, msg.sender)
    // order MUST match the struct's field order (choice, voter)
    function createVote(Choices choice) external {
        vote = Vote(choice, msg.sender);
    }
}