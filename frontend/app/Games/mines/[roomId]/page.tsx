"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import HomeSidebar from "@/app/components/homeSidebar";
import {  useParams } from "next/navigation";
import { useProgram } from "@/app/components/ProgramProvider";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";

export default function RoomMines() {
  const [numMines, setNumMines] = useState("");
  const [minePositions, setMinePositions] = useState<number[]>([]);
  const [revealedCells, setRevealedCells] = useState<number[]>([]);
  const [betPlaced, setBetPlaced] = useState(false);
  const [message, setMessage] = useState("");

  const params= useParams();
  const {roomId} = params as {roomId: string};
  console.log("Room ID:", roomId);

  const {program} = useProgram();
  const wallet = useAnchorWallet();

  const publicKey = wallet?.publicKey;

  const roomPubkey = new PublicKey(roomId);
    console.log("roompubkey from bet: ", roomPubkey);

    console.log("minepositions: ", minePositions);
    console.log("revealedcells: ", revealedCells);

    useEffect(() => {
      if (!program) return;
    
      const listeners: number[] = [];
    
      const setupListeners = async () => {
        const cellListener = await program.addEventListener("PlayerClickedEvent", (event) => {
          if (event.player.toString() === publicKey?.toString()) {
            console.log(`💎 Player ${event.player.toString()} clicked cell ${event.cell} (score ${event.score})`);
            setMessage(`You clicked cell ${event.cell}. Score: ${event.score}`);
            setRevealedCells((prev) => [...new Set([...prev, event.cell])]);
          } 
        });
    
        const mineListener = await program.addEventListener("MineHitEvent", (event) => {
          if(event.player.toString() === publicKey?.toString()) {
            console.log(`💥 Player ${event.player.toString()} hit a mine at cell ${event.cell}`);
            setMessage(`💥 You hit a mine at cell ${event.cell}`);
            setMinePositions((prev) => [...new Set([...prev, event.cell])]); 
          }// reveal mine
        });
    
        const gameOverListener = await program.addEventListener("GameOverEvent", (event) => {
          console.log(`🏆 Game Over! Winner: ${event.winner.toString()} with score ${event.score}`);
          setMessage(`🏆 Game Over! Winner: ${event.winner.toString()} (score ${event.score})`);
          setBetPlaced(false);
        });
    
        const restartListener = await program.addEventListener("GameStartedEvent", (event) => {
          console.log(`🔄 Game started by ${event.leader.toString()}`);
          setMessage("🔄 Game started! Start clicking.");
          setBetPlaced(true);
          setRevealedCells([]);
          setMinePositions([]);
        });

        const waitListener = await program.addEventListener("WaitForOthersEvent", (event) => {

          if(event.player.toString() === publicKey?.toString()) {

          console.log(`⏳ Waiting for other players to finish...`);
          setMessage("⏳ Waiting for other players to finish...");
          }
        });
    
        listeners.push(cellListener, mineListener, gameOverListener, restartListener,waitListener);
      };
    
      setupListeners();
    
      // Clean up listeners when component unmounts
      return () => {
        listeners.forEach((listenerId) => {
          program.removeEventListener(listenerId);
        });
      };
    }, [program,publicKey]);
    

  const handleBet = async () => {

    if(!program || !publicKey) {
      console.log("Program or wallet not found");
      return;
    }

    

    try{

    const tx = await program.methods
          .startGame()
          .accounts({
            room: roomPubkey,
            user: publicKey,
          })
          .rpc();
    console.log("Transaction: ", tx);
    console.log("Bet placed successfully");
    } catch (error) {
      console.error("Error placing bet:", error);
      setMessage("Error placing bet. Please try again.");
    }
  };

  const handleCellClick = async (idx: number) => {
    if(!program || !publicKey) {
      console.log("Program or wallet not found");
      return;
    }
    if (!betPlaced) {
      setMessage("Place your bet first.");
      return;
    }

    if (revealedCells.includes(idx)) return;
    if (minePositions.includes(idx)) return;

    const tx = await program.methods
      .clickCell(idx)
      .accounts({
        room: roomPubkey,
        user: publicKey,
      })
      .rpc();
    console.log("Transaction: ", tx);
  };

  const renderCellContent = (idx: number) => {

    if (minePositions.includes(idx)) {
      return <Image src="/mine.svg" alt="mine" width={111} height={101} />;
    }  
    if(revealedCells.includes(idx)) {
      return <Image src="/gem.svg" alt="gem" width={111} height={101} />;
    }
  };

  
  return(

  <>
  <Navbar />
  <HomeSidebar />

  <div className="main mt-16 float-right left-[15%] w-[85%] bottom-0 bg-[#1a2c38] p-4 text-white overflow-y-auto h-screen">
    <div className="flex">
      {/* Bet Form */}
      <div className="betForm w-[300px] h-[652px] ml-4 mt-4 rounded-bl-2xl rounded-tl-2xl bg-[#213743] p-3 flex flex-col gap-4">
        <div className="slider w-[276px] h-[50px] bg-[#0f212e] rounded-full flex gap-4">
          <div className="w-[150px] h-[40px] bg-[#1a2c38] ml-1 mt-1 rounded-full flex justify-center items-center">Manual</div>
          <div className="w-[120px] h-[50px] font-medium flex justify-center items-center">Auto</div>
        </div>

        <div className="mt-4">
          <div className="bet-amount text-[#b1bad3]">Bet Amount</div>
          <div className="flex p-2">
            <input
              type="number"
              className="w-[183px] h-[40px] bg-[#0f212e] rounded-sm p-2"
              placeholder="0.00"
            />
            <div className="flex p-2">
              <div className="w-[43px] h-[40px] text-center text-base">1/2</div>
              <div className="w-[1px] h-6 bg-black"></div>
              <div className="w-[43px] h-[40px] text-center text-base">2x</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mines-number text-[#b1bad3]">Mines</div>
          <input
            type="number"
            className="w-[276px] h-[40px] bg-[#0f212e] rounded-sm mt-2 p-2"
            placeholder="Enter number of mines"
            value={numMines}
            onChange={(e) => setNumMines(e.target.value)}
          />
        </div>

         <button
          onClick={handleBet}
          className="bg-[#1fff20] w-[276px] h-[40px] rounded-sm mt-4 text-[#05080a] text-base"
        >
          Bet
        </button>


        {message && (
          <div className="text-center text-sm text-white">{message}</div>
        )}
      </div>

      {/* Game Frame */}
      <div className="game-content w-[893px] h-[652px] bg-[#0f212e] mt-4 rounded-2xl">
        <div className="wrap w-[630px] h-[650px] p-4 grid grid-cols-5 gap-4 ml-36">
          {Array.from({ length: 25 }).map((_, idx) => (
            <div
              key={idx}
              className="mines w-[112px] h-[112px] bg-[#1a2c38] rounded-lg shadow-lg shadow-[#000] flex justify-center items-center cursor-pointer"
              onClick={() => handleCellClick(idx)}
            >
              {renderCellContent(idx)}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

    </>
  );
}
