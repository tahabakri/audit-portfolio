# Trie & TrieNode Notes

## 1. Overview
- Trie is a **prefix-based tree** used to store strings efficiently.
- Each node represents **one letter**.
- Words share **common prefixes** to save space.

---

## 2. TrieNode Structure
Each TrieNode has **3 properties**:

| Property    | Type       | Description |
|------------|-----------|-------------|
| `key`      | string    | The letter stored in this node (or `null` for root) |
| `children` | object    | Stores next letters as keys, pointing to TrieNode values |
| `isWord`   | boolean   | Marks if a complete word ends at this node (default: `false`) |

**Example:**

```text
Node: "h"
children: { "i": TrieNode, "e": TrieNode }
isWord: false

## 3. Trie Structure
- The Trie class has a single property:
  - `this.root = new TrieNode(null);`
- Root node is empty (null), acts as starting point for all words.
- Words branch from root.

## 4. Inserting a Word ("hi" example)

Step by step:

Start at root.
For each letter in the word:
If the letter exists in current.children → move into it.
If the letter does not exist → create a new TrieNode, then move into it.
After the last letter → set node.isWord = true.

Diagram:

(root: null)
    |
    h (isWord: false)
   / \
 i*    e
(isWord:true)   \
                  y*
              (isWord:true)
* = isWord = true
Children only store immediate next letters.

## 5. Key Takeaways
- Root node does not represent a letter.
- Only last letter nodes are marked as isWord = true.
- Children allow direct access to next letters without searching.

## 6. Reflection / GitHub Notes
What I did:
- Created TrieNode with key, children, isWord
- Created Trie with root node (key = null)
- Visualized inserting "hi" and "hey"

What confused me:
- Why root has null key
- When to mark isWord = true

What I think is happening:
- Root = starting point
- Each node stores next letters
- Only last letter marks a complete word