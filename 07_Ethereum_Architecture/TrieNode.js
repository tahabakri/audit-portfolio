class TrieNode {
    constructor(key) {
        this.key = key;
        this.childern = {};
        this.isEndOfWord = false;
    }
}

module.exports = TrieNode;