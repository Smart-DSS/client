// import React from "react";

// const FloodDetails = () => {
//   return (
//     <div className="flex justify-center p-[1%]">
//       <div className="w-full h-24 bg-[#f1f1f1] rounded-[15px] flex justify-between p-[5%] hover:scale-105 hover:cursor-pointer">
//         <div className="flex flex-col justify-center">
//           <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//             SHELTER 1:
//           </div>
//           <div>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Food:{" "}
//             </span>
//             <span className="text-[#02a000] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               41 days
//               <br />
//             </span>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Water:{" "}
//             </span>
//             <span className="text-[#03a100] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               51 days
//               <br />
//             </span>
//             <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               Meds:{" "}
//             </span>
//             <span className="text-[#03a100] text-xs font-semibold font-['Radio Canada'] tracking-wide">
//               36 days
//             </span>
//           </div>
//         </div>
//         <div className="flex flex-col justify-center">
//           <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
//             Accommodation left:
//           </div>
//           <div className="text-black text-4xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
//             46
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FloodDetails;


// /app/dashboard/_components/FloodDetails.jsx

import { app } from "@/config/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const FloodDetails = () => {
  const db = getFirestore(app);
  const [rainStatus, setRainStatus] = useState();
  const [waterLevel, setWaterLevel] = useState();
  const getFloodData = async () => {
    const docRef = doc(db, "Flood-data", "waterlevel-1");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRainStatus(docSnap.data()?.rainStatus);
        setWaterLevel(docSnap.data()?.waterLevel);
      } else {
        console.log("No such stage!");
      }
    } catch (error) {
      console.log("No such stage!");
    }
  };

  useEffect(() => {
    getFloodData();
  }, []);

  return (
    <div className="flex justify-center p-[1%]">
      <div className="w-full h-24 bg-gray-50 rounded-[15px] flex justify-between p-[5%] hover:bg-gray-100 hover:scale-105 hover:cursor-pointer">
        <div className="flex flex-col justify-centern w-[50%]">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            waterlevel-1
          </div>
          <div className="text-sm">Rain Status:</div>
          <div className="text-blue-900"> {rainStatus}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            Water Level:
          </div>
          <div className="text-black text-2xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
            {parseFloat(waterLevel).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodDetails;
