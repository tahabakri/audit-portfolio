# Brute Force Hashing – Learning Notes

## What the task was
* **Goal:** Given a specific hash, I needed to find which color from a list produced it.
* **Problem:** Hashing is "One-Way" math. I cannot just reverse the hash to get the input.
* **Advantage:** I knew the input *must* be one of 6 specific colors (Red, Green, Blue, etc.).

## How I approached it
1.  Since the list of possible inputs was small, I could try them all (Brute Force).
2.  I wrote a loop to take each color, turn it into bytes, and hash it.
3.  I compared that new hash to the target hash.
4.  If they matched, I returned the color name.

## The Logic (Code Snippet)
```javascript
// Loop through the known list of colors
for (let i = 0; i < COLORS.length; i++) {
    
    // 1. Convert string to bytes
    const byteColor = utf8ToBytes(COLORS[i]);

    // 2. Hash the bytes
    const hashedColor = sha256(byteColor);

    // 3. Compare the hashes (converted to Hex strings for safety)
    if (toHex(hashedColor) === toHex(hash)) {
        return COLORS[i]; 
    }
}

```

## Security note

This brute-force method only worked because the "secret" was part of a very small list.
If the input came from a list of millions of words (like a dictionary), a hacker could pre-calculate all the hashes (Rainbow Table) and still find the answer quickly.
