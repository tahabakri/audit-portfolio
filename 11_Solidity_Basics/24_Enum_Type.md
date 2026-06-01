# 24 — Enum Type

## What I Learned
- Enum assigns names to numbers
- Makes code readable and organized
- Example: Foods.Apple is clearer than just 0
- Under the hood enums are stored as uint8

## Why Safer Than Raw Numbers
- Raw numbers have no context — 0 could mean anything
- If numbers change — code breaks silently with no error
- Enum names stay meaningful even if order changes
- Other contracts can share the same enum structure

## Security Thoughts
- If a new value is added to the middle of an enum
  all existing numbers shift
- Code checking specific numbers breaks silently
- Always add new enum values at the END — never in the middle
- Auditor question: "Is this enum order ever changed after deployment?"
- Once deployed — changing enum order can break everything

## What Confused Me
- Why we add new enum values at the end not the middle
- Answer: enums are stored as numbers underneath
- Adding in the middle shifts all existing numbers
- This breaks any stored data silently
- Always add new values at the END to be safe