"use client";

import React,{useState} from 'react'
import { useContractCall } from './contractCall';
import {parseEther } from 'viem';


interface RoomModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  }

    function RoomModal({ showModal, setShowModal }: RoomModalProps) {

    const [roomId, setRoomId] = useState("");
    const [betAmount, setBetAmount] = useState("");
    const { callContract} = useContractCall();

    const createRoom = async () => {
      try {
          const tx = await callContract({
          functionName: "createRoom",
          args: [roomId, parseEther(betAmount)],
           });

           if(tx){
            console.log(`Room created successfully at ${roomId} with bet amount ${betAmount}`);
            setShowModal(false);
            setRoomId("");
            setBetAmount("");
           }
           else{
            console.log("failed to create room");
           }
      } catch (error) {
        console.error("Error creating room:", error);
      }
    };
  return (
    <div>
        {/* Modal */}
        {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Overlay */}
    <div className="absolute inset-0  backdrop-blur-[1px]"></div>

    {/* Modal content */}
    <div className="relative bg-[#1a2338] p-6 rounded-xl w-full max-w-md text-white shadow-2xl z-10">
      <h2 className="text-xl font-bold mb-4 text-center">Create a New Room</h2>
      <div>
      <input className='border border-amber-50 w-full mb-4' placeholder='Enter room name' onChange={(e)=>setRoomId(e.target.value)} />
      <input className='border border-amber-50 w-full mb-4' placeholder='Enter bet amount' type="number" onChange={(e)=>setBetAmount(e.target.value)} />
      </div>
      <div className="flex justify-between">
        <button type="button" className="bg-blue-600 p-2 rounded hover:bg-blue-700" onClick={createRoom}>
          Create
        </button>
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="bg-gray-500 p-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        </div>
    </div>
  </div>
)}


      
    </div>
  )
}

export default RoomModal