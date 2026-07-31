// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Sidekick {
    function relay(address hero, bytes memory data) external {
        // send whatever calldata we receive directly to the hero
        (bool success, ) = hero.call(data);
        require(success);
    }
}