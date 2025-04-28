"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import HomeSidebar from "@/app/components/homeSidebar";
import {  useParams } from "next/navigation";
import Image from "next/image";
import { useContractCall } from "@/app/components/contractCall";

export default function RoomMines() {
  const [numMines, setNumMines] = useState("");
  const [minePositions, setMinePositions] = useState<number[]>([]);
  const [revealedCells, setRevealedCells] = useState<number[]>([]);
  const [betPlaced, setBetPlaced] = useState(false);
  const [message, setMessage] = useState("");
  const [betAmount, setBetAmount] = useState(0);

  const params= useParams();
  const {roomId} = params as {roomId: string};

  const { callContract } = useContractCall();
  

  const handleBet = async () => {

    if (!betAmount || !numMines) {
      setMessage("Please enter a valid bet amount and number of mines.");
      return;
    }

    const mines = parseInt(numMines, 10);
    if (mines < 3 || mines > 24) {
      setMessage("Number of mines must be between 3 and 24.");
      return;
    }





    

  };

  const handleCellClick = async (idx: number) => {

  };

  const renderCellContent = (idx: number) => {
    if (revealedCells.includes(idx)) {
      return minePositions.includes(idx) ? "💣" : "💎";
    }
    return null;
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
              onChange={(e) => setBetAmount(Number(e.target.value))}
              
            />
            <div className="flex p-2">
              <div className="w-[43px] h-[40px] text-center text-base">1/2</div>
              <div className="w-[1px] h-6 bg-black"></div>
              <div className="w-[43px] h-[40px] text-center text-base">2x</div>
            </div>
          </div>
        </div>

        <div>
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
