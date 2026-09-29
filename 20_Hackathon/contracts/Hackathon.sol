// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    // Each Project stores:
    // - a title
    // - an array of ratings
    struct Project {
        string title;
        uint[] ratings;
    }

    // Dynamic array storing every project
    // projects[0], projects[1], projects[2], ...
    Project[] projects;

    // Create a new project.
    // new uint[](0) means the project starts with an empty ratings array.
    function newProject(string calldata _title) external {
        projects.push(Project(_title, new uint[](0)));
    }

    // Add a rating to a specific project.
    // _idx = which project
    // _rating = score to add
    //
    // Example:
    // rate(1, 5)
    // → add rating 5 to projects[1]
    function rate(uint _idx, uint _rating) external {
        projects[_idx].ratings.push(_rating);
    }

    // Read all projects and return the project with the highest average rating.
    // view = reads state but does not change it.
    // returns (Project memory) = returns a copy of the winning Project struct.
    // Auditor reminder: empty projects array or all-unrated projects is an edge case (defaults to projects[0] or reverts out-of-bounds).
    function findWinner() external view returns (Project memory) {
        // Highest average found so far.
        uint bestAverage = 0;

        // Index of the project currently winning.
        uint winnerIndex = 0;

        // Outer loop:
        // i = which project we are checking right now.
        for (uint i = 0; i < projects.length; i++) {

            // A new project can have zero ratings.
            // Dividing by ratings.length when it is 0 would revert.
            // continue = skip this project and move to the next one.
            if (projects[i].ratings.length == 0) {
                continue;
            }

            // Running sum of ratings for THIS project only.
            // Reset to 0 every time we move to a new project.
            uint total = 0;

            // Inner loop:
            // j = which rating inside the current project.
            for (uint j = 0; j < projects[i].ratings.length; j++) {

                // Add the current rating to total.
                //
                // Example ratings: [2, 4, 3]
                // total: 0 → 2 → 6 → 9
                total += projects[i].ratings[j];
            }

            // Average = total ratings / number of ratings.
            //
            // Solidity uint division drops decimals.
            // Example: 5 / 2 = 2, not 2.5.
            // Auditor reminder: integer division truncation can change winner logic / create ties.
            uint average = total / projects[i].ratings.length;

            // If this project has a better average than the best one so far,
            // remember both:
            // 1. its score
            // 2. which project got that score
            if (average > bestAverage) {
                bestAverage = average;
                winnerIndex = i;
            }
        }

        // winnerIndex tells us WHERE the winner is.
        // projects[winnerIndex] gives us the actual Project struct.
        return projects[winnerIndex];
    }
}
