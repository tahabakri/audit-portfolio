// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract VoteFind {
    enum Choices { Yes, No }

    struct Vote {
        Choices choice;
        address voter;
    }

    Vote[] public votes;

    function createVote(Choices choice) external {
        votes.push(Vote(choice, msg.sender));
    }

    function hasVoted(address voter) external view returns (bool) {
        Vote memory vote = findVote(voter);
        return vote.voter == voter;
    }

    function findChoice(address voter) external view returns (Choices) {
        Vote memory vote = findVote(voter);
        return vote.choice;
    }

    // shared helper - loops through votes looking for a match
    // returns an EMPTY vote (Choices(0), address(0)) if not found
    function findVote(address voter) internal view returns (Vote memory) {
        for(uint i = 0; i < votes.length; i++) {
            if(votes[i].voter == voter) {
                return votes[i];
            }
        }
        return Vote(Choices(0), address(0));
    }
}