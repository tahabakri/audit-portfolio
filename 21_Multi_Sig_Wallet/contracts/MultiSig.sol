// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;

    struct Transaction {
        address destination;
        uint256 value;
        bool executed;
    }

    // transaction ID => owner address => has this owner confirmed?
    mapping(uint256 => mapping(address => bool)) public confirmations;

    Transaction[] public transactions;

    function transactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function addTransaction(address _destination, uint256 _value) public returns (uint256) {
        uint256 txId = transactions.length;
        Transaction memory transaction = Transaction( _destination, _value, false);
        transactions.push(transaction);
        return txId;

    }

    function getConfirmationsCount(uint256 transactionId) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if(confirmations[transactionId][owners[i]]) {
                count++;
            }
        }
        return count;
    }
    
    function confirmTransaction(uint transactionId) public {
        // Assume the caller is not an owner.
        bool isOwner = false;

        // Check every address in the owners array.
        for (uint256 i = 0; i < owners.length; i++) {
            // Does the current owner match the caller?
            if (owners[i] == msg.sender) {
                isOwner = true;
            }
        }

        // Reject anyone who is not an owner.
        require(isOwner, "Not an owner");

        // Save the owner's confirmation for this transaction.
        confirmations[transactionId][msg.sender] = true;
    }

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "Owners required");
        require(_required > 0, "Required confirmations must be greater than zero");
        require(_required <= _owners.length, "Too many required confirmation");

        owners = _owners;
        required = _required;
    }
}