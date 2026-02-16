```markdown
# The ECDSA Handshake Logic

| Step | Actor | Action | Method | Goal |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Client** | **Hash** | `keccak256` | Create a unique fingerprint of the data. |
| 2 | **Client** | **Sign** | `secp.sign` | Use Private Key to prove intent. |
| 3 | **Server** | **Recover** | `recoverPublicKey` | Mathematically extract the signer's identity. |
| 4 | **Server** | **Verify** | `if` check | Ensure "Claimed Sender" == "Recovered Signer". |

---

### 🛡️ The Golden Rule of Security
> **Never send the Private Key.** Only send the Signature.
```