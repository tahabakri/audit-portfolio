// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
 * @title Collectible
 * @dev Simple collectible contract demonstrating ownership, access control, and events.
 */
contract Collectible {

    // ==========================================
    // STATE VARIABLES
    // ==========================================
    // Tracks the CURRENT owner of this collectible.
    // Making it 'public' automatically generates a getter function: owner()
    address public owner;

    // ==========================================
    // EVENTS
    // ==========================================
    // Events allow logging data to the EVM logging facilities (receipt logs).
    // They are cheap to emit and useful for off-chain listeners (dApps, indexers, unit tests).

    // Emitted ONCE when the contract is deployed (like a birth certificate / genesis record)
    event Deployed(address owner);

    // Emitted whenever ownership changes from one address to another
    event Transfer(address originalOwner, address newOwner);

    // ==========================================
    // CONSTRUCTOR
    // ==========================================
    // Runs exactly ONCE during contract deployment.
    // - msg.sender is the address that initiated the deployment transaction.
    constructor() {
        owner = msg.sender;          // Set the deployer as the initial owner
        emit Deployed(msg.sender);    // Log the deployment event with the deployer's address
    }

    // ==========================================
    // EXTERNAL FUNCTIONS
    // ==========================================
    /**
     * @notice Transfers ownership from the current owner to a new recipient.
     * @param recipient The address receiving ownership of this collectible.
     */
    function transfer(address recipient) external {
        // ACCESS CONTROL: Ensure only the current owner can transfer ownership.
        // If msg.sender is not the owner, transaction reverts with "Not the owner".
        require(msg.sender == owner, "Not the owner");

        // Cache current owner in a local/stack variable before updating state
        address originalOwner = owner;

        // STATE CHANGE: Update the storage variable to the new recipient
        owner = recipient;

        // LOGGING: Emit the Transfer event so off-chain apps and indexers know ownership moved
        emit Transfer(originalOwner, recipient);
    }

}