import React, { useState } from 'react';
import { ethers } from 'ethers';

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  depositor,
  value,
  isApproved,
  currentAccount,
  handleApprove,
  onCopy,
}) {
  const [approving, setApproving] = useState(false);

  // Format ETH value nicely
  let ethDisplay = '0.0';
  let weiDisplay = value ? value.toString() : '0';
  try {
    if (value) {
      ethDisplay = ethers.utils.formatEther(value.toString());
      const num = parseFloat(ethDisplay);
      ethDisplay = num % 1 === 0 ? num.toFixed(1) : ethDisplay;
    }
  } catch (e) {
    ethDisplay = '0.0';
  }

  const isArbiter =
    currentAccount && arbiter && currentAccount.toLowerCase() === arbiter.toLowerCase();

  const truncate = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const onApproveClick = async (e) => {
    e.preventDefault();
    if (isApproved || approving) return;

    setApproving(true);
    try {
      await handleApprove(address);
    } catch (err) {
      console.error(err);
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className={`existing-contract apple-card ${isApproved ? 'status-approved' : 'status-active'}`}>
      {/* Top Card Header */}
      <div className="escrow-header">
        <div
          className="contract-address-badge"
          onClick={() => onCopy && onCopy(address, 'Contract Address')}
          title="Click to copy contract address"
        >
          <div className="badge-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <span className="address-text mono">{truncate(address)}</span>
          <span className="copy-hint">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </span>
        </div>

        <div className={`status-pill ${isApproved ? 'pill-approved' : 'pill-active'}`}>
          <span className="status-dot"></span>
          <span className="status-label">{isApproved ? 'Completed' : 'Awaiting Arbiter'}</span>
        </div>
      </div>

      {/* Hero Value Section */}
      <div className="escrow-amount-box">
        <span className="amount-label">Locked in Escrow</span>
        <div className="amount-row">
          <span className="amount-value">{ethDisplay}</span>
          <span className="amount-currency">ETH</span>
        </div>
        <span className="amount-wei mono">{Number(weiDisplay).toLocaleString()} Wei</span>
      </div>

      {/* Participants List */}
      <div className="participants-container">
        {/* Arbiter */}
        <div className={`participant-row ${isArbiter ? 'active-role-row' : ''}`}>
          <div className="participant-info">
            <div className="participant-title">
              <span>Arbiter</span>
              {isArbiter ? (
                <span className="role-tag match-tag">Your Active Wallet</span>
              ) : (
                <span className="role-tag req-tag">Approver</span>
              )}
            </div>
            <span className="participant-address mono">{truncate(arbiter)}</span>
          </div>
          <button
            type="button"
            className="mini-copy-btn"
            title="Copy Arbiter Address"
            onClick={() => onCopy && onCopy(arbiter, 'Arbiter Address')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        {/* Beneficiary */}
        <div className="participant-row">
          <div className="participant-info">
            <div className="participant-title">
              <span>Beneficiary</span>
              <span className="role-tag ben-tag">Recipient</span>
            </div>
            <span className="participant-address mono">{truncate(beneficiary)}</span>
          </div>
          <button
            type="button"
            className="mini-copy-btn"
            title="Copy Beneficiary Address"
            onClick={() => onCopy && onCopy(beneficiary, 'Beneficiary Address')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        {/* Depositor if available */}
        {depositor && (
          <div className="participant-row">
            <div className="participant-info">
              <div className="participant-title">
                <span>Depositor</span>
                <span className="role-tag dep-tag">Origin</span>
              </div>
              <span className="participant-address mono">{truncate(depositor)}</span>
            </div>
            <button
              type="button"
              className="mini-copy-btn"
              title="Copy Depositor Address"
              onClick={() => onCopy && onCopy(depositor, 'Depositor Address')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="card-footer">
        {isApproved ? (
          <div className="approval-success-bar complete" id={address}>
            <div className="success-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span>✓ Funds Released to Beneficiary</span>
          </div>
        ) : (
          <button
            type="button"
            className={`button apple-btn ${isArbiter ? 'apple-btn-approve' : 'apple-btn-warning'}`}
            id={address}
            disabled={approving}
            onClick={onApproveClick}
          >
            {approving ? (
              <span className="spinner-row">
                <span className="apple-spinner"></span>
                <span>Approving on Chain...</span>
              </span>
            ) : isArbiter ? (
              <span className="btn-content-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Approve & Release Funds</span>
              </span>
            ) : (
              <span className="btn-content-row warning-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>Switch to Arbiter in MetaMask to Approve</span>
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
