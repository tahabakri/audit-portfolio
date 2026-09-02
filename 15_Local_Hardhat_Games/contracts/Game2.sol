//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Game2 - State Variable & Multi-Transaction Sequence
 * @notice Challenge: Trigger the `Winner` event by fulfilling prerequisites in separate transactions.
 *
 * ====================================================================
 * REVISION / LEARNING NOTES:
 * ====================================================================
 * 1. Storage Variables & Persistence:
 *    - `x` and `y` are stored in contract storage across multiple transactions.
 *    - `setX` and `setY` must be invoked in earlier transactions before `win()` is called.
 *
 * 2. Require Conditions:
 *    - `require(x > 0 && y > 0);` -> Neither variable can be left at its default value (0).
 *    - `require(x + y == 50);`   -> The sum of both variables must strictly equal 50.
 *
 * 3. Solution:
 *    - Step 1: `await game.setX(20);` (or any value 1..49)
 *    - Step 2: `await game.setY(30);` (must equal 50 - x)
 *    - Step 3: `await game.win();`
 * ====================================================================
 */
contract Game2 {
  uint public x;
  uint public y;

  function setX(uint _x) external {
    x = _x;
  }

  function setY(uint _y) external {
    y = _y;
  }

  event Winner(address winner);

  function win() public {
    require(x > 0 && y > 0);
    require(x + y == 50);
    emit Winner(msg.sender);
  }
}