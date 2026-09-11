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

## Pop and Access Control - Completed
- Added constructor pushing msg.sender as first member
- removeLastMember() calls members.pop() (removes last element)
- Both addMember and removeLastMember protected with
  require(isMember(msg.sender)) - only existing members can call

## What I Learned
- pop() and push() take NO/ONE argument respectively - easy to mix up
- Checks must happen BEFORE the action, not after
  (order matters: require FIRST, then perform the change)
- Debugging one small piece at a time is more effective than
  trying to write everything perfectly on the first attempt

## What Confused Me
- The syntax for pop() and push()
- pop() takes NO arguments - just removes the last element
- push() takes ONE argument - the value to add at the end
- Got them backwards on my first attempt, but tests helped catch it

  ## Locked In Definition
- push() = add ONE element to the END of an array (takes 1 argument)
- pop() = remove the LAST element from an array (takes NO arguments)