# Intro to JSON-RPC

## 1. Overview

Ethereum is a distributed computer made up of many nodes.

To interact with Ethereum, we do NOT talk to the blockchain directly.

Instead, we communicate with an **Ethereum node**.

---

## 2. What is JSON-RPC?

JSON-RPC is a communication protocol used to talk to Ethereum nodes.

- JSON = data format
- RPC = Remote Procedure Call (calling a function on a remote server)

### Key idea:
JSON-RPC allows us to call methods on an Ethereum node.

---

## 3. How Communication Works

### Flow:

1. User interacts with an app (or MetaMask)
2. MetaMask sends a JSON-RPC request
3. Request goes to an Ethereum node
4. Node executes the request
5. Node returns a response

---

## 4. Example Methods

Common JSON-RPC methods:

- eth_blockNumber → get latest block
- eth_getBalance → get account balance
- eth_getBlockByNumber → get block data

---

## 5. JSON-RPC Request Structure

A request contains:

- jsonrpc → version (2.0)
- method → function name
- params → inputs
- id → request identifier

---

## 6. JSON-RPC Response Structure

A response contains:

- jsonrpc → version
- result → returned data
- id → matches request

---

## 7. Key Concept: Provider

A **provider** (like MetaMask or Alchemy):

- connects your app to an Ethereum node
- sends JSON-RPC requests
- receives responses

---

## 8. Read vs Write Requests

### Read (no state change):
- eth_getBalance
- eth_blockNumber

### Write (state change):
- sending transactions
- interacting with contracts

Write requests require:
- signing with a private key

---

## 9. Key Takeaway

- You communicate with Ethereum through nodes
- JSON-RPC is the communication bridge
- MetaMask acts as a provider

# Anatomy of an Ethereum Request (JSON-RPC)

To ask a node a question, I must send a JSON object with these 4 keys:

1. "jsonrpc": Always "2.0". (This is the version of the protocol).
2. "id": An arbitrary number. (This helps me match the Clerk's answer to my specific question).
3. "method": The name of the function I want the Node to run.
4. "params": An array `[]` of extra info the Node needs to answer the question.