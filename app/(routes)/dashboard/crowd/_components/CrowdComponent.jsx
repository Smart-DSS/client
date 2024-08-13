
// /app/dashboard/_components/CrowdComponent.jsx

import React, { useState } from "react";
import CrowdDetails from "./CrowdDetails";

const CrowdComponent = () => {
  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
        <div>Crowd Details</div>
      </div>
      <div className="w-full h-[0px] border border-black m-1"></div>
      <div className="w-full h-full p-[2%] overflow-y-auto">
        <CrowdDetails />
      </div>
    </div>
  );
};

export default CrowdComponent;
