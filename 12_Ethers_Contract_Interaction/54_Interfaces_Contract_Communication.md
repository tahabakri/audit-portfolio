# 54 — Interfaces and Contract Communication

## What I Did
- Built Sidekick.sol using IHero interface to call Hero.alert()
- Pattern: ONE contract triggers an action on ANOTHER contract

## What I Learned
- interface + address = way to call functions on another contract
- Pattern: InterfaceName(address).functionName()
- Real world example: trading platform notifying a price oracle
  interface IPriceOracle { function updatePrice(uint) external; }
  IPriceOracle(oracleAddress).updatePrice(newPrice);

## What Confused Me
- The playful "hero/alert" naming made it feel abstract at first
- Helped by replacing mentally with real examples:
  price oracles, reward systems, notification services
- Core idea: ONE contract can TRIGGER an action in ANOTHER contract

