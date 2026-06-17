# 30 — Returning Values

## What I Learned
- Functions can return values using returns(type)
- view = read only — cannot change state
- pure = cannot read or change state
- Returning values is useful for queries and contract communication

## Security Thoughts
- Always mark read-only functions as view
- view is enforced by the compiler — cannot be faked
- Without view — simple queries cost gas unnecessarily
- Without view — state could be secretly changed inside
- Auditor always checks: should this function be view?
- If a function reads but is not view — ask why

## What Confused Me
- Why we need external, view, returns keywords
  Answer: each one has a specific job
  external = who can call, view = free/no state change,
  returns = what type comes back

## Questions I Still Have
- Why we need to add or change x
  Answer: in real contracts x could be a balance,
  vote count, or score — all need to change