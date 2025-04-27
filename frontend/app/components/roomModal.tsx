"use client";

import React from 'react'

interface RoomModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  }

  function RoomModal({ showModal, setShowModal }: RoomModalProps) {

    

    const createRoom = async ()=>{

    }
  return (
    <div>
        {/* Modal */}
        {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Overlay */}
    <div className="absolute inset-0  backdrop-blur-[1px]"></div>

    {/* Modal content */}
    <div className="relative bg-[#1a2338] p-6 rounded-xl w-full max-w-md text-white shadow-2xl z-10">
      <h2 className="text-xl font-bold mb-4">Create a New Room</h2>

        
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
)}


      
    </div>
  )
}

export default RoomModal