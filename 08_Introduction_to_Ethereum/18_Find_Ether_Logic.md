# 18 — Find Ether Logic

## What I Did
I created a function called findEther that searches 
the blockchain for addresses that received ether 
from a specific sender.

First it gets the current block number.
Then it loops through every block.
Then it checks every transaction inside each block.
If the transaction "from" address matches our sender — 
it collects the "to" address.
Finally it returns all collected addresses as an array.

## What I Expected
I expected the code would be more complicated. 
I also did not know where to start.

## What Actually Happened
After writing the function step by step, 
the test passed and found all 10 addresses correctly.

## What Confused Me
- I was confused about === versus =
- = means assign a value to a variable
- === means compare two values and ask "are these the same?"
- For example: if tx.from is "0xABC" and address is "0xABC" 
  then === returns true — so we collect that address.

## What I Think I Understand Now
To find where ether went, I need to:
1. Loop through every block
2. Look at every transaction inside
3. Check if "from" matches the sender
4. Collect the "to" address if it matches
5. Return all collected addresses

## Security Thoughts
- If the wrong address is passed in, the function 
  returns an empty array.
- The caller might think no ether was sent — but it was.
- This is called a false negative.
- Always validate inputs before trusting them.
- Ethereum addresses can be uppercase or lowercase.
  Always use toLowerCase() before comparing addresses.
  Missing this causes valid addresses to be skipped.

## Questions I Still Have
- How to remember code patterns without always 
  needing to look up steps.