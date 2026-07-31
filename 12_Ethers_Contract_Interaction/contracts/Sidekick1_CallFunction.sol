// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// LESSON 1: Calling Hero with an Interface (The Clean Way)
//
// WHAT I LEARNED:
// - Interfaces are like a menu describing what functions another contract has.
// - I pass the target address into the interface: IHero(heroAddress).alert()
// - This is the standard way I'll write contract-to-contract calls 95% of the time.
// - Solidity handles all the selector hashing and encoding behind the scenes for me.

interface IHero {
    function alert() external;
}

contract Sidekick1CallFunction {
    // Send alert to hero contract using the clean interface method
    function sendAlert(address hero) external {
        IHero(hero).alert();
    }
}
