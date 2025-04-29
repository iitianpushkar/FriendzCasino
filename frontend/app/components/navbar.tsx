"use client";

import {BlackCreateWalletButton} from "./BlackCreateWalletButton"

export default function Navbar(){

    
    return(
    <>
          {/* Navbar */}
        <div className="Navbar fixed top-0 left-[15%] w-[85%] h-16 bg-[#1a2c38] p-4 text-white flex justify-between items-center shadow shadow-indigo-500">
        <div className="logo text-xl font-bold">WinOrLunn.com</div>
        <BlackCreateWalletButton  />
        </div>
    </>
    )
}