// dashboard/crowd/CrowdPage.jsx

"use client";

import React from "react";
import CrowdComponent from "./_components/CrowdComponent";
import CrowdMapComponent from "./_components/CrowdMapComponent";
import FakeAlarm from "./_components/FakeAlarm";
import LocationCards from "./_components/LocationCards";
import VelocityTimeChart from "./_components/VelocityTimeChart";
import CloggingPlotComponent from "./_components/CloggingPlotComponent";
import BottleneckPlotComponent from "./_components/BottleneckPlotComponent";
import OtherPlotComponent from "./_components/OtherPlotComponent";
import RunningEventPlotComponent from "./_components/RunningEventPlotComponent";
import GridDensityPlotComponent from "./_components/GridDensityPlotComponent";
import KDEDensityPlotComponent from "./_components/KDEDensityPlotComponent";
// import CrowdComponent from "../_components/CrowdComponent";
// import LocationCards from "../_components/LocationCards";
// import CrowdMapComponent from "../_components/CrowdMapComponent";
// import FakeAlarm from "../_components/FakeAlarm";

const CrowdPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 justify-center w-full px-[4%] py-[2%]">
      <div className="w-full col-span-1 md:col-span-2 grid grid-row-2 gap-4 pt-2 pl-2">
        <CrowdMapComponent />
        <CrowdComponent />
        {/* <div className="flex justify-center pb-10 w-full">
          <div className="w-full px-10"> */}

        {/* <CloggingPlotComponent /> */}
        {/* <VelocityTimeChart /> */}
        {/* </div>
        </div> */}
      </div>
      {/* <div className="w-full col-span-1 md:col-span-3 px-2"> */}
      <div className="w-full col-span-1 md:col-span-3 h-full max-h-[400px] md:max-h-[750px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
        <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
          <div>Overview</div>
        </div>
        <div className="w-full h-[0px] border border-black m-1"></div>
        <div className="w-full h-full p-[2%] overflow-y-auto">
          {/* <CrowdMapComponent /> */}
          <CloggingPlotComponent />
          <BottleneckPlotComponent />
          {/* <OtherPlotComponent/> */}
          <RunningEventPlotComponent/>
          <GridDensityPlotComponent/>
          <KDEDensityPlotComponent/>
        </div>
      </div>
      <div className="w-full col-span-1 md:col-span-2 grid grid-row-2 gap-4">
        <FakeAlarm />
        <LocationCards />
      </div>
    </div>
  );
};

export default CrowdPage;
