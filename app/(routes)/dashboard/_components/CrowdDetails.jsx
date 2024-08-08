// /app/dashboard/_components/CrowdDetails.jsx

import { app } from "@/config/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const CrowdDetails = () => {
  //   const db = getFirestore(app);
  //   const [rainStatus, setRainStatus] = useState();
  //   const [waterLevel, setWaterLevel] = useState();
  //   const getFloodData = async () => {
  //     const docRef = doc(db, "Flood-data", "waterlevel-1");
  //     try {
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         setRainStatus(docSnap.data()?.rainStatus);
  //         setWaterLevel(docSnap.data()?.waterLevel);
  //       } else {
  //         console.log("No such stage!");
  //       }
  //     } catch (error) {
  //       console.log("No such stage!");
  //     }
  //   };

  //   useEffect(() => {
  //     getFloodData();
  //   }, []);

  const getColor = (value) => {
    if (value > 20) {
      return "text-red-600";
    } else if (value > 10) {
      return "text-orange-600";
    } else {
      return "text-green-600";
    }
  };

  return (
    <div className="flex justify-center p-[1%]">
      <div className="w-full h-24 bg-[#f1f1f1] rounded-[15px] flex justify-between p-[5%] hover:scale-105 hover:cursor-pointer">
        <div className="flex flex-col justify-centern w-[50%]">
          <div className="flex flex-col justify-center">
            <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
              SM street:
            </div>
            <div>
              <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
                Clogging:{" "}
              </span>
              <span
                className={`text-xs font-semibold font-['Radio Canada'] tracking-wide ${getColor(
                  12
                )}`}
              >
                12
                <br />
              </span>
              <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
                Bottleneck:{" "}
              </span>
              <span
                className={`text-xs font-semibold font-['Radio Canada'] tracking-wide ${getColor(
                  7
                )}`}
              >
                7
                <br />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            Diverging Flow:
          </div>
          <div className="text-black text-2xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
            7
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdDetails;
