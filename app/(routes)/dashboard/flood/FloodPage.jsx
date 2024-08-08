// /dashboard/flood/FloodPage.jsx

"use client";

import React from "react";
import ShelterComponent from "../_components/ShelterComponent";
import FloodComponent from "../_components/FloodComponent";
import FloodMapComponent from "../_components/FloodMapComponent";

const FloodPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 justify-center w-full px-[4%] py-[2%]">
      <div className="w-full col-span-1 md:col-span-2">
        <ShelterComponent />
      </div>
      <div className="w-full col-span-1 md:col-span-3">
        <FloodMapComponent />
      </div>
      <div className="w-full col-span-1 md:col-span-2">
        <FloodComponent />
      </div>
    </div>
  );
};

export default FloodPage;
