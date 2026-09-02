//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Game3 - Arithmetic Boundaries (uint8 Max Value)
 * @notice Challenge: Trigger the `Winner` event by finding `x` such that `x + y == 255`.
 *
 * ====================================================================
 * REVISION / LEARNING NOTES:
 * ====================================================================
 * 1. Maximum uint8 Value:
 *    - In Solidity, a `uint8` ranges from 0 to 255 (type(uint8).max = 255).
 *    - Even though this operation is inside an `unchecked` block, we do NOT need
 *      an overflow here because 255 is within the valid uint8 bounds.
 *
 * 2. Solving for `x`:
 *    - Given: y = 210
 *    - Requirement: x + 210 == 255
 *    - Calculation: x = 255 - 210 = 45
 *
 * 3. Contrast with Game4:
 *    - Game3 targets `255` (no overflow necessary: 45 + 210 = 255).
 *    - Game4 targets `10` (requires overflow/wrap-around: 56 + 210 = 266 % 256 = 10).
 *
 * 4. Solution:
 *    - Call `await game.win(45);`
 * ====================================================================
 */
contract Game3 {
  uint8 y = 210;

  event Winner(address winner);

  function win(uint8 x) public {
    unchecked {
        uint8 sum = x + y;
        require(sum == 255, "Incorrect argument passed in!");
    }
    emit Winner(msg.sender);
  }
}