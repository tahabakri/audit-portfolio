# Logic: Hexadecimal (The Language of Hash)

## 1. What is it?
*   Computers think in **Binary** (0s and 1s).
*   Humans think in **Decimal** (0-9).
*   Blockchains speak in **Hexadecimal** (0-9 and a-f).

## 2. Why 64 Characters?
*   SHA256 outputs **256 bits** (zeros and ones).
*   4 bits = 1 Hex Character.
*   256 / 4 = **64 Characters**.
*   *Auditor Note:* If I see a hash that is NOT 64 characters long, it is **not** a valid SHA256 hash. It might be fake or broken.

## 3. The `0x` Prefix
*   In Ethereum, we often put `0x` at the start (e.g., `0xabc...`).
*   This is just a label that says "Hey, what follows is Hexadecimal."