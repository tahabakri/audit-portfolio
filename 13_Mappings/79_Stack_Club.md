# 79 — Stack Club

## What I Did
- Built StackClub.sol with address[] public members
- addMember() pushes to the array
- isMember() loops through and checks for a match, returns bool

## What I Learned
- Reinforced: view = reads state, doesn't change it
- pure = doesn't touch state at all
- Regular (no view/pure) = allowed to CHANGE state
- Fixed my own mistake: used view/pure incorrectly when the
  function actually modifies storage (addMember)

## Security Thoughts
- isMember() loops through the ENTIRE array every time - could
  become expensive/slow as membership grows very large
- A mapping(address => bool) would be more gas-efficient for
  large member lists, since lookup is instant instead of looping