FriendzCasino

FriendzCasino is a Solana-based multiplayer mini-casino where friends can create rooms, bet together, and play a fair on-chain Minesweeper game. The server (off-chain authority) commits to random mine layouts using a cryptographic hash, and players reveal their chosen cells. The highest scorer wins and takes the pot.

Features

Room Management: Create/join game rooms via PDA seeded by a user-supplied room ID.

On-Chain Game Logic: Anchor-based Solana program with the following:

Room creation, joining, and betting with lamport transfers via CPI.

Commitment scheme for mine positions (commitMineHash), preventing cheating.

Player actions (cellsChosen, revealMines, submitMines), with scoring and payouts.

Events emitted for every state change, enabling real-time UX.

Frontend: Next.js + React + Anchor SDK

Modal UI for creating/joining rooms and entering bets.

Dynamic grid for clicking cells, with live feedback via program.addEventListener.

Responsive game-over modal showing winners and scores.

Server: Node.js listener with AnchorProvider

Uses a private key (in .env) to call commitMineHash and submitMines when triggered by on-chain events.

Generates random mine layouts off-chain and stores them in memory.

Architecture Overview

flowchart TD
  subgraph On-Chain
    A[create_room] --> B[join_room]
    B --> C[bet]
    C --> D[start_game]
    D --> E[commit_mine_hash]
    E --> F[cells_chosen per player]
    F --> G[reveal_mines]
    G --> H[submit_mines & payout]
  end

  subgraph Off-Chain Server
    S1[listen GameStartedEvent] --> S2(generate random mines)
    S2 --> S3[commitMineHash via CPI]
    S3 --> S4[listen MineRevealEvent]
    S4 --> S5[submitMines via CPI]
  end

  subgraph Frontend
    U1[create/join UI] --> U2[bet/start UI]
    U2 --> U3[cell selection]
    U3 --> U4[listen events & display grid]
    U4 --> U5[game-over modal]
  end

Getting Started

Anchor Program

cd program/minesweeper
anchor build
anchor deploy

Frontend

cd frontend
npm install
npm run dev

Server

cd server
npm install
node index.js

Tech Stack

Solana & Anchor for on-chain game logic

TypeScript, Next.js, React on frontend

Node.js, @project-serum/anchor on server

Arweave/QuickNode (or clusterApiUrl) for RPC/WebSocket

Security & Fairness

Commit-reveal scheme with Keccak hash ensures server cannot alter mine positions after commitment.

Lamport transfers via CPI guarantee atomic bets and payouts.

Event-driven UI provides transparency of game state.
