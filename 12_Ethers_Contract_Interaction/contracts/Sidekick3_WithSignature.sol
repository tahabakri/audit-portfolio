// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// LESSON 3: Using encodeWithSignature Shortcut (With Arguments)
//
// WHAT I LEARNED:
// - abi.encodeWithSignature("alert(uint256,bool)", enemies, armed) is a shortcut that hashes and packs arguments at the same time.
//
// CRITICAL RULES FOR SIGNATURE STRINGS:
// 1. Only function name & parameter types: "alert(uint256,bool)"
// 2. NO spaces between commas (e.g. "uint256,bool" not "uint256, bool")
// 3. Must use full types like uint256 (not the alias uint)

contract Sidekick3WithSignature {
    function sendAlert(address hero, uint enemies, bool armed) external {
        // Combine function signature + argument encoding into one step
        bytes memory data = abi.encodeWithSignature("alert(uint256,bool)", enemies, armed);

        // Send the pre-encoded calldata to hero
        (bool success, ) = hero.call(data);
        require(success, "Call failed");
    }
}
