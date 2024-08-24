// /dashboard/flood/FloodPage.jsx

"use client";

import React, { useState } from "react";
import ShelterComponent from "./_components/ShelterComponent";
import FloodMapComponent from "./_components/FloodMapComponent";
import FloodComponent from "./_components/FloodComponent";
import RelocateResidents from "./_components/RelocateResidents";
import FloodWarningComponent from "./_components/FloodWarningComponent";
// import ShelterComponent from "../_components/ShelterComponent";
// import FloodComponent from "../_components/FloodComponent";
// import FloodMapComponent from "../_components/FloodMapComponent";

const FloodPage = () => {
  // const [selectedShelter, setSelectedShelter] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 justify-center w-full px-[4%] py-[2%]">
      <div className="w-full col-span-2 md:col-span-5">
        <FloodMapComponent />
      </div>
      <div className="w-full col-span-1 md:col-span-2 grid grid-row-2 gap-4 ">
        {/* <RelocateResidents/> */}
        <FloodWarningComponent/>
        <FloodComponent/>
      </div>
    </div>
    // <div className="grid grid-cols-1 md:grid-cols-7 gap-4 justify-center w-full px-[4%] py-[2%]">
    //   <div className="w-full col-span-1 md:col-span-2">
    //     <ShelterComponent selectedShelter={selectedShelter} setSelectedShelter={setSelectedShelter}/>
    //   </div>
    //   <div className="w-full col-span-1 md:col-span-3">
    //     <FloodMapComponent selectedShelter={selectedShelter} setSelectedShelter={setSelectedShelter}/>
    //   </div>
    //   <div className="w-full col-span-1 md:col-span-2 grid grid-row-5 gap-4">
    //     <RelocateResidents/>
    //     <FloodComponent/>
    //     {/* <div onClick={sendPushNotification} className="px-5 py-2 bg-red-300 m-5 rounded-lg cursor-pointer">Realocate citizens</div> */}
    //   </div>
    // </div>
  );
};

export default FloodPage;
