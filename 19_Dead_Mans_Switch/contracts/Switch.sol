// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

/**
 * @title Dead Man's Switch
 * @notice A "Dead Man's Switch" is a mechanism that automatically triggers an action
 * (here, sending funds to a designated recipient) if the owner fails to regularly
 * "check in" (ping) within a specified timeframe (52 weeks).
 *
 * Use Case:
 * - Digital inheritance or emergency backup: If the owner becomes inactive or incapacitated,
 *   the funds are safely passed onto the chosen beneficiary (`recipient`).
 */
contract Switch {
    // The creator and funder of the contract who must periodically check in
    address public owner;

    // The beneficiary who receives the balance if the switch triggers
    address public recipient;

    // Timestamp (in seconds) representing when the owner last checked in
    uint256 public lastPing;

    /**
     * @notice Initializes the contract with a recipient and initial deposit.
     * @dev Marked `payable` so the owner can deposit ETH upon deployment.
     * @param _recipient Address of the beneficiary who can claim funds if the owner goes inactive.
     */
    constructor(address _recipient) payable {
        owner = msg.sender;
        recipient = _recipient;
        lastPing = block.timestamp; // Starts the timer from the deployment block
    }

    /**
     * @notice Allows the owner to check in and reset the inactivity timer.
     * @dev Can ONLY be called by `owner`. Updates `lastPing` to the current block timestamp.
     */
    function ping() external {
        require(msg.sender == owner, "Not owner");
        lastPing = block.timestamp; // Reset the countdown
    }

    /**
     * @notice Releases all ETH stored in the contract to the recipient.
     * @dev Can be called by anyone, but ONLY succeeds if at least 52 weeks (1 year)
     * have elapsed since the owner's last ping.
     */
    function withdraw() external {
        // Enforce that 52 weeks have elapsed since the last ping
        require(block.timestamp >= lastPing + 52 weeks, "still active");

        // Transfer the full balance of this contract to the recipient using low-level call (recommended for ETH transfer)
        (bool sent,) = payable(recipient).call{value: address(this).balance}("");
        require(sent, "Transfer failed");
    }
}
