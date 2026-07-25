# 43 — Storing the Owner

## What I Learned

- address type stores Ethereum addresses (20 bytes)
- msg.sender inside constructor = whoever deployed the contract
- Common pattern: store deployer as "owner" for admin permissions

## Security Thoughts

- Without a transferOwnership function, owner is LOCKED forever
- Good: prevents unauthorized takeover
- Bad: if owner's wallet is lost/hacked, no recovery possible
- Real contracts usually add:
  function transferOwnership(address newOwner) external {
  require(msg.sender == owner);
  owner = newOwner;
  }
- This lets current owner safely pass control, but nobody else can

## What Confused Me

- Why not just type the address directly?
- Answer: hardcoded address means EVERY deployment has the SAME owner
  Using msg.sender means EACH deployer becomes owner of THEIR OWN contract
  Makes the contract reusable by anyone

## Questions I Still Have

- What is owner actually used FOR in real contracts?
- Answer: controls special permissions like pausing, withdrawing,
  changing settings - things regular users shouldn't be able to do
