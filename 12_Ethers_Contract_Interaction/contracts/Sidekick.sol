// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Sidekick {
    function makeContact(address hero) external {
        // sending random bytes (0x12345678) that DON'T match
        // any real function selector on Hero
        // since it doesn't match anything, this triggers
        // Hero's fallback() function instead
        (bool success, ) = hero.call(hex"12345678");
        require(success);
    }
}