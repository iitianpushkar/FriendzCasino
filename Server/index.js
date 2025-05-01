require('dotenv').config();
const { ethers } = require('ethers');
const express = require('express');
const commitHash = require('./minesweeper/commitHash.js');
const roomMinesMap = require('./minesweeper/commitHash.js').roomMinesMap;
const submitMines = require('./minesweeper/submitMines.js');

const app = express();
app.use(express.json());

// Connect to blockchain
const provider = new ethers.WebSocketProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
 
console.log("wallet:",wallet)

// Load contract ABI
const contractABI = require('./abi.json'); 
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

console.log("contract:", contract);

 function listenToStart() {

      contract.on('GameStartedEvent', (room,leader,mines,gems,bet) => {
      console.log(`🏆 Game started: Room ${room}, leader ${leader}, mines${mines}, gems${gems}, bet${bet}`);
      commitHash(contract,room, mines);  
    });
  }

  function listenToReveal(){

    contract.on('MineRevealEvent', (room) => {
      console.log(`💣 Mine to be revealed for : Room ${room}`);
      if (roomMinesMap[room]) {
        const mines = roomMinesMap[room];
        console.log(`Mines for room ${room}:`, mines);

        submitMines(contract, room, mines);
          
        delete roomMinesMap[room];
      } else {
        console.log(`No mines found for room ${room}`);
      }
    }
    );
  }

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
    listenToStart();
    listenToReveal();
});
