//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Game5 - Allowance & Minting Workflow
 * @notice Challenge: Trigger the `Winner` event by accumulating a balance of at least 10,000.
 *
 * ====================================================================
 * REVISION / LEARNING NOTES:
 * ====================================================================
 * 1. Multi-Step State Interactions:
 *    - `balances` and `allowances` are private mappings tracking user state by address (`msg.sender`).
 *    - `mint(amount)` requires `allowances[msg.sender] >= amount` because in Solidity 0.8+,
 *      `allowances[msg.sender] -= amount` will revert on underflow if allowance is insufficient.
 *
 * 2. Function Execution Order:
 *    - Step 1: Grant allowance to `msg.sender` via `giveMeAllowance(10000)` (or more).
 *    - Step 2: Mint balance using `mint(10000)`. This consumes the allowance and credits `balances`.
 *    - Step 3: Call `win()`. Since `balances[msg.sender] >= 10000`, the require check passes.
 *
 * 3. Solution:
 *    - `await (await game.giveMeAllowance(10000)).wait();`
 *    - `await (await game.mint(10000)).wait();`
 *    - `await (await game.win()).wait();`
 * ====================================================================
 */
contract Game5 {
  mapping(address => uint) balances;
  mapping(address => uint) allowances;

  function giveMeAllowance(uint allowance) external {
    allowances[msg.sender] += allowance;
  }

  function mint(uint amount) external {
    allowances[msg.sender] -= amount;
    balances[msg.sender] += amount;
  }

  event Winner(address winner);

  function win() public {
    require(balances[msg.sender] >= 10000);
    emit Winner(msg.sender);
  }
}