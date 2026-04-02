class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = {}; // Stores next characters in the prefix path
        this.isWord = false; // Flag to indicate if a search path ends here as a complete word
    }
}

module.exports = TrieNode;