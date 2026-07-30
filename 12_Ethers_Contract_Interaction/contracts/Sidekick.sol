// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Sidekick {
    function sendAlert(address hero, uint enemies, bool armed) external {
        // signature must use uint256, not uint - and no spaces after commas
        (bool success, ) = hero.call(
            abi.encodeWithSignature("alert(uint256,bool)", enemies, armed)
        );

        require(success);
    }
}