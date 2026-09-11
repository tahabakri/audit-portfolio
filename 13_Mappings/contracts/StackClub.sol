// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract StackClub {

    // dynamic list of member addresses, like a stack
    // (Last-In-First-Out - though we're not popping in this stage)
    address[] public members;

    // adds a new address to the END of the members list
    function addMember(address _member) external {
        members.push(_member);
    }

    // checks if a given address exists ANYWHERE in the members list
    // loops through EVERY element and compares it to the target address
    function isMember(address _addr) public view returns (bool) {
        for(uint i = 0; i < members.length; i++) {
            if(members[i] == _addr) {
                return true;
            }
        }
        // if we finish the loop without finding a match, they're NOT a member
        return false;
    }

}