"use client";

import RoomModal from "./roomModal"
import { useState } from 'react'

export default function HomeSidebar (){
    const [showModal, setShowModal] = useState(false);
  
    return(
    
    <>

                {/* Sidebar */}
      <div className="sidebar fixed top-0 left-0 w-[15%] h-screen bg-[#131b2d] text-white flex flex-col">
        <div className="Sidebar-navbar bg-[#0d121d]  w-full h-16 shadow shadow-indigo-500 flex justify-center gap-10 p-2">
          <button className="bg-[#1a2c38] p-3 rounded-lg shadow shadow-blue-600">Casino</button>
          <button className="bg-[#1a2c38] p-3 rounded-lg shadow shadow-blue-600">Sports</button>
        </div>
        <div className="Sidebar-card1 bg-[#1a2338] text-white text-center mt-4 flex flex-col gap-8 rounded-2xl ml-2 mr-2 p-2">
          <button>profile</button>
          <button onClick={() => setShowModal(true)}>Create Room</button>
          <button>VIP Club</button>
          <button>Affiliate</button>
          <button>Blog</button>
          <button>Forum</button>
        </div>
        <div className="Sidebar-card1 bg-[#1a2338] text-white text-center mt-4 flex flex-col rounded-2xl ml-2 mr-2 p-2">
          <button className="mb-4">Sponsorships</button>
          <button className="mb-4">Responsible Gambling</button>
          <button className="mb-4">Live Support</button>
          <button>Language:English</button>
        </div>
      </div>

      {/*Modal*/}
     <RoomModal showModal={showModal} setShowModal={setShowModal} />

    </>
    )
}