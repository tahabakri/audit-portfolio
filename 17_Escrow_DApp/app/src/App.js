import { ethers } from 'ethers';
import { useEffect, useState, useCallback, useRef } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';
import EscrowArtifact from './artifacts/contracts/Escrow.sol/Escrow';

const STORAGE_KEY = 'apple_escrow_contracts_v1';

// Hardhat default accounts for 1-click convenience
const DEMO_ACCOUNTS = {
  arbiter: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // Account #1
  beneficiary: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Account #2
};

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [networkName, setNetworkName] = useState('Hardhat Local (31337)');
  const [balance, setBalance] = useState('0.00');

  // Form State
  const [arbiterInput, setArbiterInput] = useState('');
  const [beneficiaryInput, setBeneficiaryInput] = useState('');
  const [ethAmount, setEthAmount] = useState('1.0');
  const [weiValue, setWeiValue] = useState('1000000000000000000');

  // UI States
  const [isDeploying, setIsDeploying] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message, type = 'info') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  const copyToClipboard = (text, label = 'Address') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard`, 'success');
  };

  // Convert ETH input to Wei
  const handleEthChange = (val) => {
    setEthAmount(val);
    try {
      if (val && !isNaN(val) && parseFloat(val) > 0) {
        const parsedWei = ethers.utils.parseEther(val.toString()).toString();
        setWeiValue(parsedWei);
      } else {
        setWeiValue('0');
      }
    } catch (e) {
      setWeiValue('0');
    }
  };

  // Update account balance
  const refreshBalance = useCallback(async (acc, prov) => {
    if (!acc || !prov) return;
    try {
      const bal = await prov.getBalance(acc);
      const formatted = ethers.utils.formatEther(bal);
      setBalance(parseFloat(formatted).toFixed(4));
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  }, []);

  // Initialize Provider and Wallet
  useEffect(() => {
    if (!window.ethereum) return;
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(web3Provider);

    async function initWallet() {
      try {
        const accounts = await web3Provider.send('eth_requestAccounts', []);
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          const currentSigner = web3Provider.getSigner();
          setSigner(currentSigner);
          refreshBalance(accounts[0], web3Provider);
        }

        const network = await web3Provider.getNetwork();
        if (network.chainId === 31337) {
          setNetworkName('Hardhat Local (31337)');
        } else {
          setNetworkName(network.name || `Chain ID ${network.chainId}`);
        }
      } catch (err) {
        console.error('Wallet initialization failed:', err);
      }
    }

    initWallet();

    const handleAccountsChanged = (accounts) => {
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        const updatedSigner = web3Provider.getSigner();
        setSigner(updatedSigner);
        refreshBalance(accounts[0], web3Provider);
        showToast(
          `Switched to account: ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
          'info'
        );
      } else {
        setAccount('');
        setSigner(null);
        setBalance('0.00');
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [refreshBalance, showToast]);

  // Sync existing contracts with blockchain status & localStorage
  const syncContractsWithChain = useCallback(
    async (loadedContracts, currentProv) => {
      if (!currentProv || !loadedContracts || loadedContracts.length === 0) return;

      const synced = await Promise.all(
        loadedContracts.map(async (c) => {
          try {
            const instance = new ethers.Contract(c.address, EscrowArtifact.abi, currentProv);
            const approved = await instance.isApproved();
            const contractBalance = await currentProv.getBalance(c.address);

            // Listen for Approved event if not yet approved
            if (!approved) {
              instance.once('Approved', () => {
                setEscrows((prev) =>
                  prev.map((item) =>
                    item.address.toLowerCase() === c.address.toLowerCase()
                      ? { ...item, isApproved: true }
                      : item
                  )
                );
                showToast(`Escrow at ${c.address.substring(0, 6)}... approved!`, 'success');
              });
            }

            return {
              ...c,
              isApproved: approved || contractBalance.eq(0),
            };
          } catch (err) {
            console.warn(`Could not sync contract ${c.address}:`, err);
            return c;
          }
        })
      );

      setEscrows(synced);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(synced));
    },
    [showToast]
  );

  // Load contracts from localStorage on start
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setEscrows(parsed);
        if (provider) {
          syncContractsWithChain(parsed, provider);
        }
      }
    } catch (e) {
      console.error('Error loading saved contracts:', e);
    }
  }, [provider, syncContractsWithChain]);

  // Autofill Hardhat demo accounts
  const handleAutoFill = () => {
    setArbiterInput(DEMO_ACCOUNTS.arbiter);
    setBeneficiaryInput(DEMO_ACCOUNTS.beneficiary);
    handleEthChange('1.0');
    showToast('Loaded Hardhat Account #1 (Arbiter) and #2 (Beneficiary)', 'success');
  };

  // Deploy New Escrow Contract
  async function newContract() {
    // Read from state or fallback to DOM inputs for safety
    const arbiter = arbiterInput || document.getElementById('arbiter')?.value;
    const beneficiary = beneficiaryInput || document.getElementById('beneficiary')?.value;
    const rawWei = weiValue || document.getElementById('wei')?.value;

    if (!arbiter || !beneficiary) {
      showToast('Please specify both Arbiter and Beneficiary addresses', 'warning');
      return;
    }

    if (!ethers.utils.isAddress(arbiter)) {
      showToast('Invalid Arbiter Ethereum address', 'warning');
      return;
    }

    if (!ethers.utils.isAddress(beneficiary)) {
      showToast('Invalid Beneficiary Ethereum address', 'warning');
      return;
    }

    if (!signer) {
      showToast('Wallet not connected', 'warning');
      return;
    }

    try {
      setIsDeploying(true);
      const value = ethers.BigNumber.from(rawWei);

      showToast('Confirm deployment transaction in MetaMask...', 'info');
      const escrowContract = await deploy(signer, arbiter, beneficiary, value);
      await escrowContract.deployed();

      const newEscrowObj = {
        address: escrowContract.address,
        arbiter,
        beneficiary,
        depositor: account,
        value: value.toString(),
        isApproved: false,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // Listen for Approved event
      escrowContract.on('Approved', () => {
        setEscrows((prev) => {
          const updated = prev.map((item) =>
            item.address.toLowerCase() === escrowContract.address.toLowerCase()
              ? { ...item, isApproved: true }
              : item
          );
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });

        const legacyEl = document.getElementById(escrowContract.address);
        if (legacyEl) {
          legacyEl.className = 'complete';
          legacyEl.innerText = "✓ It's been approved!";
        }
      });

      const updatedList = [newEscrowObj, ...escrows];
      setEscrows(updatedList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      if (account && provider) {
        refreshBalance(account, provider);
      }

      showToast(`Escrow deployed at ${escrowContract.address.substring(0, 6)}...${escrowContract.address.substring(escrowContract.address.length - 4)}!`, 'success');

      // Clear beneficiary/arbiter input or leave for reuse
    } catch (err) {
      console.error('Deployment failed:', err);
      showToast(err.message ? err.message.slice(0, 70) : 'Transaction rejected or failed', 'error');
    } finally {
      setIsDeploying(false);
    }
  }

  // Handle Approve Contract
  const handleApprove = async (contractAddress) => {
    const target = escrows.find(
      (e) => e.address.toLowerCase() === contractAddress.toLowerCase()
    );

    if (!target) return;

    // Security & User Experience Check:
    // If the connected account is NOT the arbiter, alert the user proactively!
    if (account && target.arbiter && account.toLowerCase() !== target.arbiter.toLowerCase()) {
      showToast(
        `Access Denied: You are connected as ${account.substring(0, 6)}... but Arbiter is ${target.arbiter.substring(0, 6)}... Switch in MetaMask to approve!`,
        'error'
      );
      return;
    }

    try {
      showToast('Confirm Approval in MetaMask...', 'info');
      const contractInstance = new ethers.Contract(
        contractAddress,
        EscrowArtifact.abi,
        signer
      );

      await approve(contractInstance, signer);

      // Update state
      setEscrows((prev) => {
        const updated = prev.map((item) =>
          item.address.toLowerCase() === contractAddress.toLowerCase()
            ? { ...item, isApproved: true }
            : item
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      if (account && provider) {
        refreshBalance(account, provider);
      }

      showToast('✓ Escrow approved! Funds successfully transferred to Beneficiary.', 'success');
    } catch (err) {
      console.error('Approval failed:', err);
      const msg = err.data?.message || err.message || 'Transaction reverted';
      showToast(`Approval failed: ${msg.substring(0, 80)}`, 'error');
    }
  };

  // Clear local saved history
  const handleClearHistory = () => {
    if (window.confirm('Clear local escrow history list? (Does not delete on-chain contracts)')) {
      setEscrows([]);
      localStorage.removeItem(STORAGE_KEY);
      showToast('Escrow history cleared', 'info');
    }
  };

  // Stats calculation
  const totalEthLocked = escrows
    .filter((e) => !e.isApproved)
    .reduce((acc, curr) => {
      try {
        return acc + parseFloat(ethers.utils.formatEther(curr.value || '0'));
      } catch {
        return acc;
      }
    }, 0);

  const completedCount = escrows.filter((e) => e.isApproved).length;

  return (
    <div className="apple-app-container">
      {/* Dynamic Island / Apple Floating Toast Notification */}
      {toast && (
        <div className={`apple-toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' && '✓'}
            {toast.type === 'error' && '✕'}
            {toast.type === 'warning' && '⚠'}
            {toast.type === 'info' && 'ℹ'}
          </span>
          <span className="toast-text">{toast.message}</span>
        </div>
      )}

      {/* Top Glassmorphic Navigation Bar */}
      <header className="apple-navbar">
        <div className="navbar-content">
          <div className="brand-group">
            <div className="brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="4" ry="4"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div className="brand-meta">
              <div className="brand-title">
                Escrow<span className="brand-accent">OS</span>
              </div>
              <div className="brand-subtitle">Decentralized Trust Protocol</div>
            </div>
          </div>

          <div className="nav-controls">
            {/* Network Badge */}
            <div className="network-pill">
              <span className="pulse-dot"></span>
              <span className="network-name">{networkName}</span>
            </div>

            {/* Wallet Info Pill */}
            {account ? (
              <div
                className="wallet-pill"
                onClick={() => copyToClipboard(account, 'Connected Wallet')}
                title="Click to copy connected address"
              >
                <div className="wallet-balance">{balance} ETH</div>
                <div className="wallet-address-chip mono">
                  {account.substring(0, 6)}...{account.substring(account.length - 4)}
                </div>
              </div>
            ) : (
              <div className="wallet-pill-disconnected">Wallet Disconnected</div>
            )}
          </div>
        </div>
      </header>

      {/* Global Metrics Bar */}
      <div className="metrics-strip">
        <div className="metric-box">
          <span className="metric-label">Active Escrows</span>
          <span className="metric-value">{escrows.length - completedCount}</span>
        </div>
        <div className="metric-divider"></div>
        <div className="metric-box">
          <span className="metric-label">Total Locked</span>
          <span className="metric-value">{totalEthLocked.toFixed(2)} ETH</span>
        </div>
        <div className="metric-divider"></div>
        <div className="metric-box">
          <span className="metric-label">Settled Contracts</span>
          <span className="metric-value">{completedCount}</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="apple-workspace">
        {/* Left Column: Create Contract Card */}
        <section className="contract-panel">
          <div className="contract apple-card">
            <div className="panel-header">
              <div className="panel-title-group">
                <h1 className="panel-title">New Agreement</h1>
                <p className="panel-subtitle">Create a trustless conditional payment contract</p>
              </div>

              <button
                type="button"
                className="demo-fill-btn"
                onClick={handleAutoFill}
                title="Quickly fill with Hardhat Account #1 & #2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                <span>Demo Accounts</span>
              </button>
            </div>

            <div className="form-fields-wrapper">
              {/* Arbiter Address Input */}
              <div className="apple-input-group">
                <div className="input-label-row">
                  <label htmlFor="arbiter">Arbiter Address</label>
                  <span className="input-role-hint">Authorized Approver</span>
                </div>
                <div className="input-container">
                  <div className="input-prefix-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="arbiter"
                    placeholder="0x7099... (Trusted 3rd Party)"
                    value={arbiterInput}
                    onChange={(e) => setArbiterInput(e.target.value)}
                    className="apple-input mono"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {arbiterInput && (
                    <button
                      type="button"
                      className="input-clear-btn"
                      onClick={() => setArbiterInput('')}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Beneficiary Address Input */}
              <div className="apple-input-group">
                <div className="input-label-row">
                  <label htmlFor="beneficiary">Beneficiary Address</label>
                  <span className="input-role-hint">Fund Recipient</span>
                </div>
                <div className="input-container">
                  <div className="input-prefix-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="beneficiary"
                    placeholder="0x3C44... (Payment Target)"
                    value={beneficiaryInput}
                    onChange={(e) => setBeneficiaryInput(e.target.value)}
                    className="apple-input mono"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {beneficiaryInput && (
                    <button
                      type="button"
                      className="input-clear-btn"
                      onClick={() => setBeneficiaryInput('')}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Deposit Amount (with ETH & Wei Dual View) */}
              <div className="apple-input-group">
                <div className="input-label-row">
                  <label htmlFor="wei">Deposit Amount</label>
                  <span className="input-role-hint">Locked in Escrow</span>
                </div>
                <div className="input-container">
                  <div className="input-prefix-currency">ETH</div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="1.0"
                    value={ethAmount}
                    onChange={(e) => handleEthChange(e.target.value)}
                    className="apple-input amount-input"
                  />
                  {/* Keep legacy input hidden or synced for tests requiring #wei */}
                  <input
                    type="hidden"
                    id="wei"
                    value={weiValue}
                    onChange={() => {}}
                  />
                </div>

                {/* Live Wei Conversion Display */}
                <div className="wei-preview-bar">
                  <span className="wei-label">Calculated Wei:</span>
                  <span className="wei-value mono">{Number(weiValue).toLocaleString()} Wei</span>
                </div>

                {/* Quick Presets */}
                <div className="presets-row">
                  {['0.1', '0.5', '1.0', '2.0'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`preset-chip ${ethAmount === val ? 'preset-active' : ''}`}
                      onClick={() => handleEthChange(val)}
                    >
                      {val} ETH
                    </button>
                  ))}
                </div>
              </div>

              {/* Deploy Button */}
              <button
                type="button"
                className="button apple-primary-btn"
                id="deploy"
                disabled={isDeploying}
                onClick={(e) => {
                  e.preventDefault();
                  newContract();
                }}
              >
                {isDeploying ? (
                  <span className="btn-spinner-row">
                    <span className="apple-spinner"></span>
                    <span>Deploying Escrow Vault...</span>
                  </span>
                ) : (
                  <span className="btn-label-row">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Deploy Contract</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Existing Contracts Panel */}
        <section className="existing-panel">
          <div className="existing-contracts apple-card">
            <div className="existing-header">
              <div className="existing-title-group">
                <h1 className="panel-title">Existing Contracts</h1>
                <p className="panel-subtitle">
                  {escrows.length === 0
                    ? 'No contracts deployed yet'
                    : `${escrows.length} ${escrows.length === 1 ? 'Contract' : 'Contracts'} on Localnet`}
                </p>
              </div>

              {escrows.length > 0 && (
                <button
                  type="button"
                  className="clear-history-btn"
                  onClick={handleClearHistory}
                  title="Clear local view history"
                >
                  Clear History
                </button>
              )}
            </div>

            {/* Contracts Container */}
            <div id="container" className="contracts-feed">
              {escrows.length === 0 ? (
                <div className="empty-state-box">
                  <div className="empty-icon-circle">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <h3 className="empty-title">No Escrow Agreements Found</h3>
                  <p className="empty-desc">
                    Deploy your first escrow agreement on the left. The contract will appear here and persist across page refreshes.
                  </p>
                  <button
                    type="button"
                    className="empty-cta-btn"
                    onClick={handleAutoFill}
                  >
                    Load Demo Parameters
                  </button>
                </div>
              ) : (
                escrows.map((escrow) => (
                  <Escrow
                    key={escrow.address}
                    {...escrow}
                    currentAccount={account}
                    handleApprove={handleApprove}
                    onCopy={copyToClipboard}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
