# 68 — Nested Mappings

## What I Did
- Built mapping(address => mapping(address => ConnectionTypes))
- Each person tracks their OWN relationship status with EVERY other person
- Struggled with identifying parameter names, but worked through it

## What I Learned
- Nested mapping = mapping INSIDE another mapping
- Access pattern: mapping[key1][key2] = value
- Example: connections[msg.sender][other] = connectionType
- This is ONE-DIRECTIONAL - Alice saying "Bob is Friend" does NOT
  automatically make Bob say "Alice is Friend" back

## Security Thoughts
- Connections are self-reported, not mutual by default
- Real world use: DAOs tracking votes per proposal
  mapping(uint proposalId => mapping(address voter => bool))

## What Confused Me
- Genuinely struggled identifying which variable name
  represented which value in the function parameters
- Had to slow WAY down, one tiny piece at a time
- This felt harder than earlier contracts today - real struggle

## Questions I Still Have
- Why do we need nested mappings, why does it feel stressful?
- Answer: nested mappings track relationships BETWEEN two things,
  not just ONE overall value
- Real world analogy: phone contacts - you have a DIFFERENT
  relationship with EACH person, not just ONE overall status
- It feels harder because it GENUINELY is more complex -
  tracking TWO things at once instead of one
- This complexity is NECESSARY for the real-world problem
  (DAOs tracking votes PER proposal PER voter, for example)
