"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import HomeSidebar from "@/app/components/homeSidebar";
import {  useParams } from "next/navigation";
import { useContractCall } from "@/app/components/contractCall";
import { parseEther, formatEther} from "viem";
import {useAccount } from "wagmi";
import {abi} from "@/app/abi";
import { usePollContract } from "@/app/lib/usePollContract";



export default function RoomMines() {
  const [numMines, setNumMines] = useState(0);
  const [betPlaced, setBetPlaced] = useState(false);
  const [message, setMessage] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [gems, setGems] = useState(0);
  const [roomData, setRoomData] = useState<any>(null);
  const [playersJoined, setPlayersJoined] = useState<any>(null);
  const [playersBetted, setPlayersBetted] = useState<any>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [cellsChosen, setCellsChosen] = useState<number[]>([]);

  const params= useParams();
  const {roomId} = params as {roomId: string};
 
  const { callContract } = useContractCall();

  const account = useAccount();

  const { data: roomdata } = usePollContract<[string, boolean, number, number, bigint, boolean, boolean, string, bigint]>({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "rooms",
    args: [roomId],
    pollInterval: 2000,
  });
  
  useEffect(() => {
    if (roomdata) {
      setRoomData(roomdata);
      setBetAmount(Number(formatEther(roomdata[4])));
      console.log("Room Data:", roomdata);
    }
  }, [roomdata]);
  
  
  const { data: playersjoined = [] } = usePollContract<string[]>({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getJoinedPlayers",
    args: [roomId],
    pollInterval: 2000, 
  });
  
  useEffect(() => {
    if (playersjoined && playersjoined.length > 0) {
      setPlayersJoined(playersjoined);
      console.log("Players Joined:", playersjoined);
    }
  }, [playersjoined]);
  
  
  //-----------------------------------------------------
  
  const { data: playersbetted = [] } = usePollContract<string[]>({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getActivePlayers",
    args: [roomId],
    pollInterval: 2000, 
  });
  
  useEffect(() => {
    if (playersbetted && playersbetted.length > 0 && account && account.address) {
      setPlayersBetted(playersbetted);
      console.log("Players Betted:", playersbetted);
      if(playersbetted.includes(account.address)){
        setBetPlaced(true);
      }
    }
  }, [playersbetted,account]);



    useEffect(() => {
      if(roomData && account){
       if(roomData[5] == true){
          setGameStarted(true);
          setNumMines(roomData[2]);
          setGems(roomData[3]);
        }
      }

    },[account,roomData]);

  
  
  const handleBet = async () => {

    try {
      const tx = await callContract({
        functionName:"bet",
        args: [roomId],
        value:parseEther(betAmount.toString()),
      });
  
      if(tx){
        setMessage("Bet placed successfully!");
      }
      else{
        setMessage("Failed to place bet.");
      }
      
    } catch (error) {
      console.error("Error placing bet:", error);
      setMessage("Error placing bet.");
      
    }
  };

  const handleStartGame = async () => {
    try {
      const tx = await callContract({
        functionName:"startGame",
        args: [roomId,numMines,gems],
      });
  
      if(tx){
        setMessage("Game started successfully!");
      }
      else{
        setMessage("Failed to start game.");
      }
      
    } catch (error) {
      console.error("Error starting game:", error);
      setMessage("Error starting game.");
      
    }
  };

  const handleCellClick = async (idx: number) => {
    if (!gameStarted || !betPlaced) return;
  
    if (cellsChosen.includes(idx)) return;
  
    if (cellsChosen.length < gems) {
      setCellsChosen((prev) => [...prev, idx]);
    }
  }

  const handleSubmitCells = async () => {
    const cellsToSubmit = cellsChosen.map((cell) => cell+1);
    try {
      const tx = await callContract({
        functionName: "cellsChosen",
        args: [roomId, cellsToSubmit],
      });
      if(tx){
        setMessage("Cells submitted successfully!");
      }
    }
    catch(error){
      console.error("Error submitting cells:", error);
    }
  }

  const handleReveal = async () => {
    try {

      const tx = await callContract({
        functionName: "revealMines",
        args: [roomId],
      });
  
      if (tx) {
        setMessage("Mines revealing soon!");
      } else {
        setMessage("Failed to reveal mines.");
      }
      
    } catch (error) {
      console.error("Error revealing mines:", error);
      
    }
  }
  

  const renderCellContent = (idx: number) => {
    return null;
  };

  
  return (
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

            <div>
              <div className="mines-number text-[#b1bad3]">Mines</div>

                <input
                type="number"
                className="w-[276px] h-[40px] bg-[#0f212e] rounded-sm mt-2 p-2"
                placeholder="Enter number of mines e.g. 3"
                value={numMines}
                onChange={(e) => setNumMines(Number(e.target.value))}
              />
            </div>

            <div>
              <div className="gems-number text-[#b1bad3]">Gems</div>
                <input
                type="number"
                className="w-[276px] h-[40px] bg-[#0f212e] rounded-sm mt-2 p-2"
                placeholder="Enter number of gems e.g 5"
                value={gems}
                onChange={(e) => setGems(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex gap-4">
            <button className="bg-green-700 w-[100px] rounded-2xl shadow shadow-amber-600" onClick={handleBet}> 1. Bet</button>
            <button className="bg-red-600 w-[110px] rounded-2xl shadow shadow-blue-800 " onClick={handleStartGame}> 2. Start Game</button>
            </div>
            <div className="flex gap-4">
            <button className="bg-amber-700 w-[120px] rounded-2xl shadow shadow-gray-950" onClick={handleSubmitCells}> 3. Submit Cells</button>
            <button className="bg-fuchsia-800 w-[120px] rounded-2xl shadow shadow-neutral-200" onClick={handleReveal}> 3. Reveal Mines</button>
            </div>
            </div>

             
        



            {message && (
              <div className="text-center text-sm text-white">{message}</div>
            )}

            <div className="bet-amount text-white text-sm">Bet Amount needed : {betAmount}</div>
            <div className="bet-amount text-white text-sm">Players Joined : {playersJoined ? playersJoined.length : "0"}</div>
            <div className="bet-amount text-white text-sm">Players Betted : {playersBetted ? playersBetted.length : "0"}</div>
            <div className="bet-amount text-white text-sm">Total Bet : {roomData ? formatEther(roomData[8]) : "0"}</div>
            <div className="bet-amount text-white text-sm">Gems : {roomData && roomData[3] ? roomData[3]: "Game not started yet"}</div>
            <div className="bet-amount text-white text-sm">Mines : {roomData && roomData[2] ? roomData[2]: "Game not started yet"}</div>
          </div>

          {/* Game Frame */}
          <div className="game-content w-[893px] h-[652px] bg-[#0f212e] mt-4 rounded-2xl">
            <div className="wrap w-[630px] h-[650px] p-4 grid grid-cols-5 gap-4 ml-36">
              {Array.from({ length: 25 }).map((_, idx) =>{
                const isChosen = cellsChosen.includes(idx);
                 return (
                
                <div
                  key={idx}
                  className={`mines w-[112px] h-[112px] rounded-lg shadow-lg shadow-[#000] flex justify-center items-center cursor-pointer 
                  ${isChosen ? 'bg-red-600' : 'bg-[#1a2c38]'}`}
                  onClick={() => handleCellClick(idx)}
                >
                  {renderCellContent(idx)}
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
