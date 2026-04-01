Merkle Trees are good for permanent data like transactions.

Ethereum account data changes frequently, so Ethereum uses a Merkle Patricia Trie.

The root of this trie is the State Root stored in the block header.

What I learned:
- Trie nodes store next letters using children
- isEndOfWord tells us if a full word ends at that node

What confused me:
- Why we need to mark the end

What I think is happening:
- Without isEndOfWord, we can't tell if a word is complete or just a prefix

What I did:
- Simulated inserting "hi" into a trie

What confused me:
- When to create vs move vs mark end

What I think is happening:
- We build the path letter by letter
- Only the last letter gets isEndOfWord = true