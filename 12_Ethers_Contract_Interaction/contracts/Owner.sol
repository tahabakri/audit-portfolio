// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Owner {

    // stores the address of whoever deployed this contract
    address public owner;

    // stores the charity's address - set once at deployment
    address public charity;

    // runs once at deployment
    // saves the deployer as owner
    // saves the charity address passed in by the deployer
    constructor(address _charity) {
        owner = msg.sender;
        charity = _charity;
    }

    // runs when contract receives ETH with no extra data
    receive() external payable {}

    // anyone can send ETH here - it goes DIRECTLY to owner
    function tip() public payable {
        (bool success, ) = owner.call{ value: msg.value }("");
        require(success);
    }

    // VULNERABILITY: no access control - anyone can call this!
    // selfdestruct sends ALL remaining ETH to charity
    // historically this also deleted the contract's bytecode forever
    // NOTE: due to EIP-6780 (2024 upgrade), modern EVM behavior
    // only deletes bytecode if called in the SAME tx as creation
    // otherwise it just sends the ether, contract remains active
    function donate() public {
        selfdestruct(payable(charity));
    }

}