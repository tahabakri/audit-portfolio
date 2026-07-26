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

    // address(this) = the address of THIS contract itself
    // .balance = how much ETH this contract currently holds
    // sends ALL of that ETH to the charity address
    function donate() public {
        (bool success, ) = charity.call{ value: address(this).balance }("");
        require(success);
    }

}