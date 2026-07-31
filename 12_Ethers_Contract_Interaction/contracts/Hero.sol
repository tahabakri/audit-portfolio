// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hero {
    bool public alerted;

    Ambush public ambush;

    struct Ambush {
        bool alerted;
        uint enemies;
        bool armed;
    }

    uint lastContact;

    function alert() external {
        alerted = true;
    }

    function alert(uint enemies, bool armed) external {
        ambush = Ambush(true, enemies, armed);
    }

    fallback() external {
        alerted = true;
    }
}