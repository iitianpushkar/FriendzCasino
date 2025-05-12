# FriendzCasino 🎮💎

A decentralized multiplayer Minesweeper casino on Solana where friends compete in trustless on-chain games.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Solana](https://img.shields.io/badge/Solana-3E1F70?logo=solana&logoColor=white)

## Overview 🌟
FriendzCasino combines classic Minesweeper gameplay with decentralized betting:
- Create private rooms with custom bets
- Provably fair mine layout via commit-reveal scheme
- Real-time multiplayer interaction
- Winner-takes-all SOL prize pools

## Features ✨

### Smart Contract (Anchor)
- 🏠 PDA-based room management
- 💰 CPI-powered SOL transfers for atomic bets/payouts
- 🔐 Keccak256 commit-reveal for mine positions
- 🎯 Game lifecycle handlers (create/join/reveal/settle)
- 📡 Event emission for real-time UI sync

### Frontend (Next.js)
- 🎨 Responsive Minesweeper grid with cell interactions
- 📊 Live game state via Anchor event listeners
- 🚪 Room creation/joining modals
- 🏆 Auto-updating leaderboard & win modal

### Server (Node.js)
- 🛡️ Secure mine layout generation & commitment
- ⚡ Event-triggered reveal transactions
- 📦 In-memory state management for active games

## Tech Stack ⚙️

| Component        | Technologies                         |
|------------------|--------------------------------------|
| Blockchain       | Solana, Anchor Framework             |
| Frontend         | Next.js 14, React 18, Tailwind CSS    |
| Wallet Integration| @solana/wallet-adapter               |
| Backend          | Node.js, Express, Anchor SDK         |
| Security         | Keccak256, CPI-based fund management |
