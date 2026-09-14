import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (!window.ethereum) {
  root.render(
    <React.StrictMode>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#090a0f',
        color: '#f5f5f7',
        fontFamily: "'Inter', -apple-system, sans-serif",
        padding: '24px'
      }}>
        <div style={{
          background: 'rgba(22, 26, 38, 0.75)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '440px',
          textAlign: 'center',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 20px',
            background: 'rgba(255, 159, 10, 0.15)',
            border: '1px solid rgba(255, 159, 10, 0.3)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff9f0a',
            fontSize: '24px'
          }}>🦊</div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Web3 Wallet Required</h2>
          <p style={{ fontSize: '14px', color: '#9499ad', lineHeight: '1.6', marginBottom: '24px' }}>
            Please install or connect MetaMask to interact with EscrowOS contracts on localnet.
          </p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #0071e3, #0077ed)',
              color: '#fff',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            Get MetaMask
          </a>
        </div>
      </div>
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
