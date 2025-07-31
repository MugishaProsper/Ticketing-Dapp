# 🎟️ Blockchain-Based Ticketing DApp (Ethereum + NextJS + Ethers.js)

A decentralized ticketing platform designed for fast, secure, and scalable event access using blockchain technology.

## 🧠 Overview

This project is a **Web3 DApp** built using **NextJS** on the frontend and **Ethereum smart contracts** using **Hardhat** on the backend. It allows users to **buy**, **validate**, and **transfer** tickets securely via blockchain — no centralized server needed.

## 🔐 Key Features

| Feature | Description |
| --- | --- |
| **Blockchain Security** | All tickets are minted as NFTs on Ethereum. No duplicates, no scams. |
| **Fast Validation** | Ticket scans complete in under 2 seconds. |
| **Simple UX** | Built-in MetaMask connection + multilingual chatbot support (planned). |
| **Scalability** | Supports 1,000+ concurrent users (prototype). |
| **High Uptime** | 99% availability target for prototype stage. |

## 🗂️ Tech Stack

| Layer | Tech |
| --- | --- |
| **Blockchain** | Ethereum, Solidity, Hardhat |
| **Wallet** | MetaMask (for wallet connection) |

## 📁 Project Structure

```bash
project-root/
├── smart-contracts/       # Hardhat project for contract dev/deploy
│   ├── contracts/
│   ├── scripts/
│   └── hardhat.config.js│
└── README.md
```

## 🔄 Workflow

1. **Deploy smart contracts** using Hardhat to a testnet like Goerli or Sepolia.
2. **Users buy tickets**, which are minted to their wallet.
3. **Validators scan/verify tickets** using on-chain data.
4. **Data is immutable, decentralized, and secure**.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0
- MetaMask browser extension

### Installation

1. Install dependencies for smart contracts
```bash
cd smart-contracts
npm install
```

### Development

1. Start local Hardhat node
```bash
cd smart-contracts
npx hardhat node
```

2. Deploy contracts to local network
```bash
npx hardhat run scripts/deploy.js --network localhost
```