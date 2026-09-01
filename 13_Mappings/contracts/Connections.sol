// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Connections {
    enum ConnectionTypes { 
        Unacquainted,
        Friend,
        Family
    }
    
    // nested mapping: each address maps to ANOTHER mapping
    // that tracks their connection type with EVERY other address
    mapping(address => mapping(address => ConnectionTypes)) public connections;

    // creates a connection FROM msg.sender TO the other address
    function connectWith(address other, ConnectionTypes connectionType) external {
        connections[msg.sender][other] = connectionType;
    }
}
