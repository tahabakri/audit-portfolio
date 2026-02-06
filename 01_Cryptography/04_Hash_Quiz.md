# Self-Quiz: Hash Functions & Brute Force

## Question 1: The "One-Way" Rule
In the code, we had the `hash` (the result). Why did we have to write a loop to guess the color? Why couldn't we just use a command like `decrypt(hash)` to get the color back instantly?

**My Answer:**
We had to write a loop because Hash Functions are "One-Way." You cannot guess the input from the output, just like you cannot look at a fingerprint and magically know the person's face. We had to take the fingerprint of every suspect (color) one by one to find a match.

## Question 2: The "Determinism" Rule
If I run the code today and it says "red" matches the hash `0xabc...`, and I run it again next year, will "red" still match `0xabc...`? Why or why not?

**My Answer:**
Yes, it will still match. The rule is "Input A always gives Output B." The hash never changes unless I change the input (like adding a space or a capital letter). If I change the input even slightly, the hash changes completely (Avalanche Effect).

## Question 3: The Hacker's Limit
Our code worked instantly because there were only 6 colors. What would happen to our code if the list of colors had 1 billion different colors? Would it still be instant?

**My Answer:**
No, it would not be instant. It would technically "work," but it would take a huge amount of computing power and time. Brute forcing is fast for small lists (6 items), but very slow for big lists (1 billion items). This is why short passwords are weak and long passwords are strong.

