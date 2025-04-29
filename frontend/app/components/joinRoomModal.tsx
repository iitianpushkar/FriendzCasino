"use client";

import { useContractCall } from "./contractCall";
import { useState} from "react";
import { useRouter } from "next/navigation";


interface RoomModalProps {
    joinMinesModal: boolean;
    setjoinMinesModal: React.Dispatch<React.SetStateAction<boolean>>;
  }


function JoinRoomModal({joinMinesModal,setjoinMinesModal}: RoomModalProps) {

    const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const { callContract} = useContractCall();

  
  const joinRoom = async () => {
    try {
        const tx = await callContract({
        functionName: "joinRoom",
        args: [roomId],
      });

      if(tx){
        console.log(`Room joined successfully at ${roomId}`);
        setjoinMinesModal(false);
        setRoomId("");
      
        router.push(`/Games/mines/${roomId}`);
      }
      else{
        console.log("failed to join room");
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };
  return (
    <div>
        {/* Modal */}
      {joinMinesModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Overlay */}
    <div className="absolute inset-0  backdrop-blur-[1px]"></div>

    {/* Modal content */}
    <div className="relative bg-[#1a2338] p-6 rounded-xl w-full max-w-md text-white shadow-2xl z-10">
      <h2 className="text-xl font-bold mb-4 text-center">Join Room</h2>
      <div className="flex flex-col gap-4">
      <input className='border border-amber-50 w-full mb-4' placeholder='Enter room name' onChange={(e)=>setRoomId(e.target.value)} />
      </div>
      <div className="flex justify-between">
        <button type="button" className="bg-blue-600 p-2 rounded hover:bg-blue-700" onClick={joinRoom}>
          Join
        </button>
        <button
          type="button"
          onClick={() => setjoinMinesModal(false)}
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

export default JoinRoomModal
