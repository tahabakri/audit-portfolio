// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract VoteOnce {

    // Yes = 0, No = 1
    enum Choices { Yes, No }

    // groups a choice with WHO made it
    struct Vote {
        Choices choice;
        address voter;
    }

    // list of ALL votes ever cast, in order
    Vote[] public votes;

    // creates a new vote, but ONLY if this address hasn't voted yet
    function createVote(Choices choice) external {
        require(!hasVoted(msg.sender), "Already voted");
        votes.push(Vote(choice, msg.sender));
    }

    // checks if an address has already cast a vote
    // changed from external to PUBLIC so createVote can call it internally
    // (external functions CANNOT be called from inside the same contract)
    function hasVoted(address voter) public view returns (bool) {
        Vote memory vote = findVote(voter);
        return vote.voter == voter;
    }

    // finds which choice a given address voted for
    function findChoice(address voter) external view returns (Choices) {
        Vote memory vote = findVote(voter);
        return vote.choice;
    }

    // shared helper - loops through votes looking for a match
    // returns an EMPTY vote if not found
    function findVote(address voter) internal view returns (Vote memory) {
        for(uint i = 0; i < votes.length; i++) {
            if(votes[i].voter == voter) {
                return votes[i];
            }
        }
        return Vote(Choices(0), address(0));
    }
}