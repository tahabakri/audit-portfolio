// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Enum {

    // enum gives names to numbers
    // Apple = 0, Pizza = 1, Bagel = 2, Banana = 3
    // Safer than using raw numbers — names don't change meaning
    enum Foods { Apple, Pizza, Bagel, Banana }

    // Each food variable stores one value from the enum
    // public = anyone can read these values
    Foods public food1 = Foods.Apple;
    Foods public food2 = Foods.Pizza;
    Foods public food3 = Foods.Bagel;
    Foods public food4 = Foods.Banana;

}