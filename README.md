# 🎟️ Blockchain-Based Ticketing DApp (Ethereum + Vite + Ethers.js)

A decentralized ticketing platform designed for fast, secure, and scalable event access using blockchain technology.

## 🧠 Overview

This project is a **Web3 DApp** built using **Vite + React + TypeScript** on the frontend and **Ethereum smart contracts** using **Hardhat** on the backend. It allows users to **buy**, **validate**, and **transfer** tickets securely via blockchain — no centralized server needed.

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
| **Frontend** | Vite, React, TypeScript, Ethers.js |
| **Blockchain** | Ethereum, Solidity, Hardhat |
| **Wallet** | MetaMask (for wallet connection) |

## 📁 Project Structure

```bash
project-root/
├── smart-contracts/       # Hardhat project for contract dev/deploy
│   ├── contracts/
│   ├── scripts/
│   └── hardhat.config.js
│
├── frontend/              # Vite + React + TS frontend
│   ├── src/
│   │   ├── lib/           # abi.ts & provider.ts
│   │   ├── components/
│   │   └── App.tsx
│   └── vite.config.ts
│
└── README.md
```

## 🔄 Workflow

1. **Deploy smart contracts** using Hardhat to a testnet like Goerli or Sepolia.
2. **Frontend connects** to Ethereum via MetaMask using `ethers.js`.
3. **Users buy tickets**, which are minted to their wallet.
4. **Validators scan/verify tickets** using on-chain data.
5. **Data is immutable, decentralized, and secure**.

## 📦 Future Plans

- 🔁 QR Code integration for ticket scanning
- 🌍 IPFS for decentralized ticket metadata
- 🧠 AI chatbot for multilingual customer support
- 📱 Mobile-friendly UI

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0
- MetaMask browser extension

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/blockchain-ticketing-dapp.git
cd blockchain-ticketing-dapp
```

2. Install dependencies for smart contracts
```bash
cd smart-contracts
npm install
```

3. Install dependencies for frontend
```bash
cd ../frontend
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

3. Start frontend development server
```bash
cd ../frontend
npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.