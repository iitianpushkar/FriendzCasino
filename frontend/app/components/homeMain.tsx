"use client";

import Image from "next/image";
import { useState } from "react";
import JoinRoomModal from "./joinRoomModal";



export default function HomeMain (){

    const [joinMinesModal, setjoinMinesModal] = useState(false);
    return(   
    <>

         {/* Main Content */}
         <div className="main mt-16 float-right left-[20%] w-[85%] bottom-0 bg-[#1a2c38] text-white overflow-y-auto scroll-smooth">
        <div className="vip-card bg-[url('/bg.png')] bg-cover w-full h-[320px] flex items-center justify-end">

        <div className="w-[365px] h-[196px] rounded-2xl border border-amber-600 mr-12 flex flex-col justify-center items-center">
          <div className="text-center font-bold h-[40px]">Welcome to WinOrLunn.com</div>
          <div className="text-center font-bold ml-32">....Win Chahiye ya Lunn </div>
          
        </div>

        <Image src="/girllogo.png" alt="girl" width={350} height={230} className="rounded-2xl ml-8"/>

        <Image src="/3men-logo.png" alt="men" width={350} height={230} className="rounded-2xl mr-8 ml-4"/>
  
        </div>

        <div className="">continue playing</div>
        <div className="games-section w-full h-[232px] overflow-x-auto whitespace-nowrap space-x-4 flex px-2 scroll-smooth scrollbar-hide">


          <Image src="/minegamelogo.png" alt="mines" width={149} height={216} className="rounded-2xl cursor-pointer" onClick={() => {setjoinMinesModal(true)}} />
          <JoinRoomModal joinMinesModal={joinMinesModal} setjoinMinesModal={setjoinMinesModal} />
          
          <Image src="/life-and-death-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/mental2-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/racing-logo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/olympus-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/duel-at-dawn-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/cs2-logo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/sweet-bonanza-logo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/mineslogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/mineslogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
        </div>

        <div className="">Trending games</div>
        <div className="games-section w-full h-[232px] overflow-x-auto whitespace-nowrap space-x-4 flex px-2 scroll-smooth scrollbar-hide">

          <Image src="/blackjack-logo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/roulette-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/craps-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/dragontiger-logo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/texashold-logo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/baccarat-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/sugarrushlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/sugarrushlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/sugarrushlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/sugarrushlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
        </div>

        <div className="">Sports</div>
        <div className="games-section w-full h-[232px] overflow-x-auto whitespace-nowrap space-x-4 flex px-2 scroll-smooth scrollbar-hide">

          <Image src="/cricketlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/basketball-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/baseball-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/tennis-logo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/mma-logo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/golf-logo.png" alt="mines" width={149} height={216} className="rounded-2xl" />
          <Image src="/cricketlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/cricketlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/cricketlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
          <Image src="/cricketlogo.png" alt="mines" width={149} height={216} className="rounded-2xl"/>
        </div>
      </div>


    
    
    </>
    )
}