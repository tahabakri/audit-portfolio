# 57 — Taking Calldata (Relay Pattern)

## What I Did
- Built relay() that forwards ANY raw calldata to ANY address
- Sidekick doesn't need to know WHAT function is being called

## What I Learned
- bytes memory data can hold ANY encoded function call
- .call(data) executes whatever was encoded, regardless of contract
- Real world use: multi-signature wallets, DAOs
  - Store calldata, gather approvals, THEN execute
  - Contract doesn't need to know the specific action in advance

## Security Thoughts - CRITICAL VULNERABILITY
- relay() has NO access control - EXTREMELY dangerous
- Anyone could use Sidekick as a "puppet" to call ANY function
  on ANY contract, using Sidekick's OWN permissions
- If Sidekick has special access somewhere, attacker exploits it
  THROUGH Sidekick without needing direct permission themselves
- FIX: require(msg.sender == owner) before allowing relay
- This is one of the MOST dangerous vulnerability patterns -
  arbitrary calldata forwarding with no restrictions

## What Confused Me
- How to memorize all these different patterns
- Answer: don't need to memorize perfectly - need to recognize
  SHAPES of patterns and know where to look up exact syntax

## Questions I Still Have
- Why so many different ways to call other contracts?
- Answer: different situations need different tools
  (like cars vs planes vs boats for transportation)
- Interface = simple, known function
- Manual/encodeWithSignature = low-level control
- Raw calldata relay = FLEXIBLE for unknown future actions
  (critical for DAOs/multisig wallets that need to approve
  ANY type of action without knowing in advance what it will be)