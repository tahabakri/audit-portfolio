# 80 — Structs with Enums

## What I Did
- Built VoteStruct.sol combining an enum (Choices) with a struct (Vote)
- Vote struct stores a choice AND the voter's address together
- createVote() packages both into a single struct instance

## What I Learned
- Struct fields can be OTHER custom types, like enums
- Struct initialization pattern: Vote(choice, msg.sender)
  matches the field order defined in the struct
- Alternate named initialization: Vote({choice: choice, voter: msg.sender})
  is safer against field reordering, but breaks if field NAMES change
- Code style choice: named initialization is clearer for structs
  with many fields, positional is fine for small/simple structs