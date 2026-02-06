# Auditor's Logic Map: Hash Functions

## 1. The "Trust" Problem
*   **The Centralized Server:** If code runs on my private server, I can change it or delete it.
*   **The Blockchain:** Once code is deployed, it is **[Decentralized]**.
*   **Why it matters:** As an auditor, I know that if I miss a bug, the developer cannot just "undo" it later. The code runs exactly as written forever.

## 2. The 5 Rules of Hashing (SHA-256)
The video lists 5 properties. Here is my translation:

1.  **Deterministic:**
    *   Input: "Mona Lisa" -> Output: `0xABC`
    *   Input: "Mona Lisa" (1 year later) -> Output: **[SAME]**

2.  **Pseudorandom:**
    *   Input: "41" -> Output: `0x123...`
    *   Input: "42" -> Output: `0x999...`
    *   **Observation:** The outputs look **[COMPLETELY DIFFERENT]**. You cannot guess the pattern.

3.  **One-Way:**
    *   It is easy to go Input -> Output.
    *   It is **[IMPOSSIBLE]** to go Output -> Input.
    *   *Security Note:* This is why we can't reverse-engineer a password from its hash.

4.  **Collision Resistant:**
    *   Ideally, two different inputs should **[NEVER]** produce the same output.

5.  **Fast to Compute:**
    *   The computer calculates it instantly.

## 3. My Conclusion
If a hacker changes **one pixel** of an image, the hash changes **[COMPLETELY]**. This allows the blockchain to detect tampering immediately.

Never assume two strings hash the same just because they look the same.
