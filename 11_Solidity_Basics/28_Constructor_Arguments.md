# 28 — Constructor Arguments

## What I Learned
- Constructor runs once at deployment — never again
- Constructor can accept arguments from the deployer
- The deployer decides the starting values
- Underscore _x prevents variable shadowing

## What Is Variable Shadowing
- When parameter name and state variable have same name
- Solidity gets confused about which one to use
- Fix: add underscore to parameter _x vs x

## Security Thoughts
- Deployer controls all constructor arguments
- If constructor sets something important — deployer has power
- Always ask: "Who deploys this and what power do they have?"
- Constructor cannot be called again after deployment
- So spam is not possible via constructor
- But wrong starting values cannot be fixed after deployment
- Auditor always checks constructor arguments carefully

## What Confused Me
- Why underscore is used for parameters
  Answer: just a naming convention to avoid shadowing
  _x = coming in, x = stored in contract

- How many times constructor runs
  Answer: exactly once — at deployment — never again

- Can we change x after deployment
  Answer: not unless there is a setter function
  If a public setter exists — anyone can change x
  That could be a vulnerability


