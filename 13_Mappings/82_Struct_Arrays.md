# 82 — Struct Arrays

## What I Did
- Built VoteArray.sol storing MULTIPLE Vote structs in an array
- votes[] holds every vote ever cast, in order

## What I Learned
- Arrays can hold structs, just like any other data type
- Vote[] public votes creates an array where each element
  is a full Vote struct (choice + voter)
- votes.push(Vote(choice, msg.sender)) adds a new record to the list
- Access individual records with votes(index) - auto-generated getter for public arrays

