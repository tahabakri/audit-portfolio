/**
 * @file Trie.js
 * @description A prefix tree (Trie) implementation for efficient string storage and lookups.
 * In the context of Ethereum, Tries (particularly the Merkle Patricia Trie) are fundamental
 * for representing the global state, storage, and transaction roots.
 * 
 * Performance: O(L) for insertion and search, where L is the length of the string.
 */

const TrieNode = require('./TrieNode');

class Trie {
    /**
     * Initializes the Trie with an empty root node (null key).
     */
    constructor() {
        this.root = new TrieNode(null);
    }

    /**
     * Inserts a word into the Trie by following existing prefixes or creating new ones.
     * @param {string} word - The string to be stored in the Trie.
     */
    insert(word) {
        let current = this.root;

        // Traverse through each character in the word
        for (let char of word) {
            // If the character doesn't exist as a child, create a new branch
            if (!current.children[char]) {
                current.children[char] = new TrieNode(char);
            }
            
            // Move deeper into the tree
            current = current.children[char];
        }

        // Mark the final character node as the end of a complete word
        current.isWord = true;
    }

    /**
     * Searches for a complete word within the Trie.
     * @param {string} word - The string to search for.
     * @returns {boolean} - Returns true if the exact word exists in the Trie.
     */
    contains(word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            const letter = word[i];

            // If any character in the search path is missing, the word does not exist
            if (!node.children[letter]) {
                return false;
            }

            // Descend further into the path
            node = node.children[letter];
        }

        /**
         * The loop finds the node for the last letter. 
         * We only return true if this node is marked as a valid word endpoint.
         */
       return node.isWord;
    }
}

module.exports = Trie;