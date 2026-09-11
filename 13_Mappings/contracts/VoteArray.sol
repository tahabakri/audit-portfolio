// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract VoteArray {

    // Yes = 0, No = 1
    enum Choices { Yes, No }

    // groups a choice with WHO made it
    struct Vote {
        Choices choice;
        address voter;
    }

    // a LIST of ALL votes ever cast, in order
    // grows automatically with .push()
    Vote[] public votes;

    // creates a new Vote and adds it to the END of the votes array
    function createVote(Choices choice) external {
        votes.push(Vote(choice, msg.sender));
    }
}