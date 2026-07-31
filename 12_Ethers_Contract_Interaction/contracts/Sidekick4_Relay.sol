// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// LESSON 4: Relaying Raw Calldata (Forwarding Pattern)
//
// WHAT I LEARNED:
// - bytes memory data can hold ANY pre-packaged function call.
// - target.call(data) executes whatever was encoded, without Sidekick needing to know what function it is.
// - Used in real life by DAOs & multi-sig wallets (Gnosis Safe) to execute approved calls.
//
// DANGEROUS VULNERABILITY:
// - relay() currently has NO access control!
// - Anyone could use Sidekick as a puppet to run arbitrary calls on other contracts using Sidekick's permissions.

contract Sidekick4Relay {
    // Forwards pre-encoded calldata to any target address
    function relay(address target, bytes memory data) external {
        (bool success, ) = target.call(data);
        require(success, "Relay failed");
    }
}
