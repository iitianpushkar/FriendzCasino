require('dotenv').config();
const { ethers } = require('ethers');
const express = require('express');

const app = express();
app.use(express.json());

// Connect to blockchain
const provider = new ethers.WebSocketProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load contract ABI
const contractABI = require('./abi.json'); 
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

console.log("contract:", contract);

function listenToEvents() {
    contract.on('GameStartedEvent', (leader,mines) => {
      console.log(`🏆 Game started: Room leader ${leader}, mines${mines}`);
      // You can also send Discord webhook, notification, save to DB, etc.
    });
  }

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);


app.get('/create-room', async (req, res) => {
  try {
    const tx = await contract.createRoom("101");
    await tx.wait();
    console.log('Transaction details:', tx);
    res.status(200).json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
);

app.get('/join-room', async (req, res) => {
  try {
    const tx = await contract.joinRoom("101");
    await tx.wait();
    res.status(200).send({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
);

app.get('/start-game', async (req, res) => {
  try {
    const tx = await contract.startGame("101",3,5);
    await tx.wait();
    res.status(200).send({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
    listenToEvents();
});
