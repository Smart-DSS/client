// import React from "react";
// import FloodDetails from "./FloodDetails";

// const FloodComponent = () => {
//   return (
//     <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">

//       <div className="w-full flex justify-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">Availability</div>
//       <div className="w-full h-[0px] border border-black m-1"></div>

//       <div className="w-full h-full  p-[2%] overflow-y-auto">
//         <FloodDetails />
//         <FloodDetails />
//         <FloodDetails />
//         <FloodDetails />
//         <FloodDetails />
//         <FloodDetails />
//         <FloodDetails />
//         <FloodDetails />
//       </div>
//     </div>
//   );
// };

// export default FloodComponent;



// /app/dashboard/_components/FloodComponent.jsx

import React, { useState } from "react";
import FloodDetails from "./FloodDetails";

const FloodComponent = () => {
  return (
    <div className="w-full h-full max-h-[300px] md:max-h-[230px] flex flex-col mx-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <div className="w-full flex justify-center items-center text-black text-lg font-['Radio Canada'] tracking-wide">
        <div>Flood Details</div>
      </div>
      <div className="w-full h-[0px] border border-black m-1"></div>
      <div className="w-full h-full p-[2%] overflow-y-auto">
        <FloodDetails />
        <FloodDetails />
        <FloodDetails />
        <FloodDetails />
        <FloodDetails />
      </div>
    </div>
  );
};

export default FloodComponent;
