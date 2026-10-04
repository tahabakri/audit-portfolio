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

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "Owners required");
        require(_required > 0, "Required confirmations must be greater than zero");
        require(_required <= _owners.length, "Too many required confirmation");

        owners = _owners;
        required = _required;
    }
}