# 32 — Overloading Functions

## What I Learned

- Two functions can share the same name
- Solidity picks the right one based on number/type of parameters
- Example: double(x) vs double(x, y)
- Functions can return multiple values as a tuple
- Tuples are not a formal type — just grouped values

## Security Thoughts

- Overloading can cause confusion for users
- Wrong function might be called by mistake
- Example: transfer(to) vs transfer(to, amount)
- Calling the wrong one could send unexpected amounts
- Many teams avoid overloading for critical functions like transfer
- Auditor question: "Could someone accidentally call the wrong overload?"

## What Confused Me

- Solidity does not care about parameter names (x, y)
  Only cares about number and type of parameters
- transfer(to) vs transfer(to, amount) is genuinely confusing
  User might call wrong version by accident
  This is a real security risk in practice

## Questions I Still Have

- How do real audited contracts avoid this confusion?
  Answer: many avoid overloading for money functions entirely
  Use different names instead like transferFixed() and transferAmount()
