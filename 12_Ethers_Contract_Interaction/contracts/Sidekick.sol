// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Sidekick {
    function sendAlert(address hero) external {
        // hash the function signature "alert()" and take first 4 bytes
        bytes4 signature = bytes4(keccak256("alert()"));

        (bool success, ) = hero.call(abi.encodePacked(signature));

        require(success);
    }
}