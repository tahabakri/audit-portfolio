// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
 * @title Collectible
 * @dev Simple collectible contract demonstrating ownership, access control, events, and purchase mechanics.
 */
contract Collectible {

    // ==========================================
    // STATE VARIABLES
    // ==========================================
    // Tracks the CURRENT owner of this collectible.
    // Making it 'public' automatically generates a getter function: owner()
    address public owner;

    // Tracks the current asking price in wei.
    // A price of 0 means the collectible is NOT currently for sale.
    uint256 public price;

    // ==========================================
    // EVENTS
    // ==========================================
    // Events allow logging data to the EVM logging facilities (receipt logs).
    // They are cheap to emit and useful for off-chain listeners (dApps, indexers, unit tests).

    // Emitted ONCE when the contract is deployed (like a birth certificate / genesis record)
    event Deployed(address owner);

    // Emitted whenever ownership changes from one address to another
    event Transfer(address originalOwner, address newOwner);

    // Emitted when the collectible is marked for sale
    event ForSale(uint256 price, uint256 timestamp);

    // Emitted when a purchase occurs
    event Purchase(uint256 amount, address buyer);

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

    /**
     * @notice Marks the collectible for sale with an asking price.
     * @param askingPrice The price in wei.
     */
    function markPrice(uint256 askingPrice) external {
        require(msg.sender == owner, "Not the owner");
        price = askingPrice;
        emit ForSale(askingPrice, block.timestamp);
    }

    /**
     * @notice Allows a buyer to purchase the collectible at the asking price.
     * payable allows this function to receive ETH (msg.value).
     */
    function purchase() external payable {
        // Item MUST be marked for sale (price > 0) before purchase is allowed
        require(price > 0, "Not for sale");

        // Buyer MUST send EXACTLY the asking price - no less, no more
        require(msg.value == price, "Incorrect price");

        // Cache the seller (current owner) before updating storage
        address seller = owner;

        // Reset price back to 0 - item is NO LONGER for sale
        price = 0;

        // Transfer ownership to the buyer
        owner = msg.sender;

        // Send payment directly to the seller
        (bool success, ) = seller.call{ value: msg.value }("");
        require(success, "Payment failed");

        // Log this purchase permanently
        emit Purchase(msg.value, msg.sender);
    }
}