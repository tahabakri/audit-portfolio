// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract EventDemo {

    // defines an event - like a "receipt" that gets logged permanently
    // indexed = allows filtering/searching by this specific value later
    event PointsAdded(address indexed user, uint points);

    mapping(address => uint) public scores;

    function addPoints(uint _points) external {
        scores[msg.sender] += _points;

        // emit fires the event, logging this action to the blockchain
        // the CONTRACT itself can NEVER read this back
        // only OUTSIDE apps/scripts can listen for it
        emit PointsAdded(msg.sender, _points);
    }
}