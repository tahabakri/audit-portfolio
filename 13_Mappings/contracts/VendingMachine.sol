// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract VendingMachine {

    // starts with 10 sodas in stock
    uint public numSodas = 10;

    // tracks how many sodas EACH address has purchased
    // key = address, value = number of sodas bought
    // mappings default to 0 for any address that hasn't interacted yet
    mapping(address => uint) public sodasPurchased;

    // anyone can buy ONE soda if stock is available
    function purchaseSoda() public {
        // fix for vulnerability found earlier:
        // only allow ONE purchase per address
        // if they've already bought one, sodasPurchased[msg.sender] > 0,
        // and this check will FAIL, stopping the transaction
        require(sodasPurchased[msg.sender] == 0, "Already purchased");

        // must have stock available
        require(numSodas > 0, "Sodas must be in stock!");

        // increase THIS caller's purchase count by 1
        sodasPurchased[msg.sender] += 1;

        // decrease the total stock by 1
        numSodas--;
    }
}