// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// LESSON 5: Triggering Hero's Fallback Function
//
// WHAT I LEARNED:
// - Sending 4 bytes of calldata (like hex"12345678") that doesn't match any real function selector triggers the target's fallback() function.
// - EVM fallback() acts as a default handler whenever it receives an unrecognized selector or raw call.

contract Sidekick5Fallback {
    function makeContact(address hero) external {
        // Send random selector bytes (0x12345678) that don't match any function on Hero
        // This causes Hero's fallback() function to run!
        (bool success, ) = hero.call(hex"12345678");
        require(success, "Contact failed");
    }
}
