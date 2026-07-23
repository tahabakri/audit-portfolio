// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Modify {
    uint public value;

    function modify(uint _value) external {
        value = _value;
    }
}