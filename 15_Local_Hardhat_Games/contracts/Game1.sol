//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Game1 - Direct Execution Puzzle
 * @notice Challenge: Trigger the `Winner` event by calling `win()`.
 *
 * ====================================================================
 * REVISION / LEARNING NOTES:
 * ====================================================================
 * 1. Events:
 *    - Events in Solidity (`event Winner(address winner)`) allow contracts to log
 *      information to the Ethereum Virtual Machine (EVM) logging facilities.
 *    - Events are gas-efficient ways to record state changes or milestone actions
 *      that can be listened to by off-chain clients (e.g., ethers.js).
 *
 * 2. msg.sender:
 *    - A global variable representing the immediate caller of the function.
 *    - When called by a wallet, `msg.sender` is the wallet's EOA (Externally Owned Account).
 *
 * 3. Solution:
 *    - Simple invocation: `await game.win();`
 * ====================================================================
 */
contract Game1 {
  event Winner(address winner);

  function win() public {
    emit Winner(msg.sender);
  }
}