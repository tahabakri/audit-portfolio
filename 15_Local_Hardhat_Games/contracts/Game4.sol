//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Game4 - Unchecked Integer Overflow Puzzle
 * @notice Challenge: Trigger the `Winner` event by calling `win(x)` with the correct `x`.
 *
 * ====================================================================
 * REVISION / LEARNING NOTES:
 * ====================================================================
 * 1. Solidity 0.8+ Overflow Checks:
 *    - By default, Solidity 0.8+ reverts on arithmetic overflow and underflow.
 *    - The `unchecked { ... }` block explicitly disables these compiler checks,
 *      restoring the wrapping behavior from pre-0.8 versions.
 *
 * 2. uint8 Wrap-Around Arithmetic:
 *    - A `uint8` variable can only hold values from 0 to 255 (2^8 - 1).
 *    - When unchecked addition exceeds 255, it wraps around modulo 256:
 *      result = (x + y) mod 256
 *
 * 3. Solving for `x`:
 *    - Given: y = 210
 *    - Condition: (x + 210) mod 256 == 10
 *    - Since 210 > 10, the addition must overflow beyond 255 into the next cycle:
 *      x + 210 = 256 + 10 = 266
 *      x = 266 - 210 = 56
 *    - Proof: 56 + 210 = 266. In uint8: 266 % 256 = 10. Condition passes!
 * ====================================================================
 */
contract Game4 {
  uint8 y = 210;

  event Winner(address winner);

  /**
   * @notice Calls win with `x = 56` to pass the require statement.
   * @param x The uint8 value that wraps around when added to y (210) to equal 10.
   */
  function win(uint8 x) public {
    unchecked {
        uint8 sum = x + y; // Overflows and wraps around modulo 256
        require(sum == 10, "Incorrect argument passed in!");
    }
    emit Winner(msg.sender);
  }
}