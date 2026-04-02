# Logic: Trie Insertion (Building the Dictionary)

## 1. The Goal
I needed to create a system that stores words by breaking them into individual letters. This allows different words to share the same "root path" (e.g., "HE" and "HEY" share the first two letters).

## 2. The Traversal Logic
To insert a word like "HEY", the code follows these steps:
1. **Start at the Root:** The root is always empty (`null`).
2. **Loop through letters:** For each character (H, then E, then Y):
   - **Check for existence:** Look at `current.children[char]`. 
   - **Create if missing:** If that letter isn't there, create a new `TrieNode`.
   - **Move downward:** Update `current` to be the child node. We are "walking" deeper into the tree.
3. **Mark the End:** Once the loop finishes, set `current.isWord = true`. This is the "Full Stop" marker.

## 3. Auditor's Security Perspective
As an auditor, I learned two critical things about "State" in this lesson:

- **The Typo Trap:** In JavaScript, if I misspell a property (e.g., `childern` instead of `children`), the code might silently create a new empty property. In a Smart Contract, this could lead to "Lost State" where data is written to the wrong place and can never be retrieved.
- **Data Integrity:** The `isWord` boolean is a "Security Gate." If a hacker could flip an `isWord` from `false` to `true` on a path that isn't a real word, they might be able to trick the system into thinking a piece of data (like a permission or a balance) exists when it doesn't.

## 4. Key Syntax learned
- `Object.children[key]` to access properties dynamically.
- Using a `for...of` loop to iterate through strings character by character.