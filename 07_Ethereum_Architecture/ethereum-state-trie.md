## Ethereum State Trie

Ethereum stores all accounts in a Merkle Patricia Trie.

address → account state

Account state includes:
- balance
- nonce
- storageRoot
- codeHash

The root hash of this trie is the State Root stored in the block header.

If account data changes, the State Root changes.

## Patricia Trie Optimization

Instead of storing full keys, Patricia tries store only the necessary path.

Example:
- Keys: "apple", "apply", "ape"
- Common prefix: "ap"
- Only store "ap" once, then branch

This saves space and makes updates faster.

## How Updates Work

When an account is updated:
1. Find the leaf node.
2. Update the value.
3. Recompute hashes up to the root.

Only the nodes on the path are affected.

## Security Benefits

1. **Tamper-evident**: Any change invalidates the root.
2. **Efficient Proofs**: Only path nodes needed for verification.
3. **Space-Efficient**: No duplicate keys, compressed paths.

## Auditor Takeaway

When auditing smart contracts, remember that:
- Contract state is stored in the State Trie.
- Changing state requires traversing the Trie.
- This costs gas and affects the State Root.

Understanding Trie structure helps identify gas optimization opportunities.

## The Ethereum State Root

The Ethereum State Root is the hash of the Merkle Patricia Trie that stores all Ethereum account states.