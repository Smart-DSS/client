// dashboard/crowd/CrowdPage.jsx


"use client"

import React from "react";
import CrowdComponent from "../_components/CrowdComponent";
import LocationCards from "../_components/LocationCards";
import CrowdMapComponent from "../_components/CrowdMapComponent";
import FakeAlarm from "../_components/FakeAlarm";

const CrowdPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 justify-center w-full px-[4%] py-[2%]">
      <div className="w-full col-span-1 md:col-span-2">
        <CrowdComponent />
      </div>
      <div className="w-full col-span-1 md:col-span-3">
        <CrowdMapComponent/>
      </div>
      <div className="w-full col-span-1 md:col-span-2 grid grid-row-2 gap-4">
        <FakeAlarm/>
        <LocationCards />
      </div>
    </div>
  );
};

export default CrowdPage;
