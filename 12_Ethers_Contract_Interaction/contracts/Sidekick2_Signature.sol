// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// LESSON 2: Calling Hero Manually with keccak256 Signature
//
// WHAT I LEARNED:
// - Under the hood, EVM looks at the first 4 bytes of keccak256("functionName()") to know which function to run.
// - bytes4(keccak256("alert()")) creates that 4-byte selector manually.
// - abi.encodePacked() turns it into bytes so hero.call(...) can send it.
//
// GOTCHA / AUDIT NOTE:
// - Typos in signature strings (like extra spaces) won't show compiler errors!
// - If I make a typo, it creates a completely wrong selector and fails at runtime.

contract Sidekick2Signature {
    function sendAlert(address hero) external {
        // Step 1: Calculate the 4-byte selector for "alert()"
        bytes4 signature = bytes4(keccak256("alert()"));

        // Step 2: Send the raw selector bytes directly to the hero contract
        (bool success, ) = hero.call(abi.encodePacked(signature));
        require(success, "Call failed");
    }
}
