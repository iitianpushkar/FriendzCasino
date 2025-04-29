import { Abi } from "viem";

export const abi: Abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      }
    ],
    "name": "BetEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "winners",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "score",
        "type": "uint8"
      }
    ],
    "name": "GameOverEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "leader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "mines",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "gems",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalBet",
        "type": "uint256"
      }
    ],
    "name": "GameStartedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "submittedHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "expectedHash",
        "type": "bytes32"
      }
    ],
    "name": "HashMismatchEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "committedHash",
        "type": "bytes32"
      }
    ],
    "name": "MineHashCommittedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint8[]",
        "name": "revealedMines",
        "type": "uint8[]"
      }
    ],
    "name": "MinePositionEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      }
    ],
    "name": "MineRevealEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8[]",
        "name": "chosenCells",
        "type": "uint8[]"
      }
    ],
    "name": "PlayerCellsEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      }
    ],
    "name": "PlayerJoinedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "leader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "betAmount",
        "type": "uint256"
      }
    ],
    "name": "RoomCreatedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "score",
        "type": "uint8"
      }
    ],
    "name": "ScoreEvent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_CELLS",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_PLAYERS",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      }
    ],
    "name": "bet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "internalType": "uint8[]",
        "name": "chosenCells",
        "type": "uint8[]"
      }
    ],
    "name": "cellsChosen",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "mineHash",
        "type": "bytes32"
      }
    ],
    "name": "commitMineHash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "betAmount",
        "type": "uint256"
      }
    ],
    "name": "createRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      }
    ],
    "name": "getActivePlayers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      }
    ],
    "name": "getJoinedPlayers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      }
    ],
    "name": "joinRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      }
    ],
    "name": "revealMines",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "rooms",
    "outputs": [
      {
        "internalType": "address",
        "name": "leader",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "mines",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "gems",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "betAmount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "started",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "minesRevealed",
        "type": "bool"
      },
      {
        "internalType": "bytes32",
        "name": "committedMineHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "totalBet",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "mines",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "gems",
        "type": "uint8"
      }
    ],
    "name": "startGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "internalType": "uint8[]",
        "name": "revealedMines",
        "type": "uint8[]"
      }
    ],
    "name": "submitMines",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;