import React, { useEffect, useState } from "react";
import FloodWarningDetails from "./FloodWarningDetails";
import { app } from "@/config/FirebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const FloodWarningComponent = () => {
  const [floodData, setFloodData] = useState([]);
  const db = getFirestore(app);

  const getAllFloodData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "FloodWarning-data"));
      const data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const waterLevel = docData.waterLevel >= 0 ? docData.waterLevel : 0;
        const updateDate = docData.updateDate || null; // Optional field
        const updateTimeString = docData.updateTimeString || null; // Optional field
        const RainStatus = docData.RainStatus || null; // Optional field
        const Rainfall = docData.Rainfall || null; // Optional field
        const WindSpeed = docData.WindSpeed || null; // Optional field

        data.push({
          location: doc.id,
          waterLevel,
          updateDate,
          updateTimeString,
          RainStatus,
          Rainfall,
          WindSpeed,
        });
      });

      console.log(data)
      // Sort data by the absolute value of water level in descending order
      data.sort((a, b) => Math.abs(b.waterLevel) - Math.abs(a.waterLevel));

      setFloodData(data);
    } catch (error) {
      console.log("Error fetching flood data:", error);
    }
  };

  useEffect(() => {
    getAllFloodData();
  }, []);

  return (
    <div className="w-full h-full max-h-[300px] md:max-h-[400px] flex flex-col mx-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <div className="w-full flex justify-center items-center text-black text-lg font-['Radio Canada'] tracking-wide">
        <div>Flood Warnings</div>
      </div>
      <div className="w-full h-[0px] border border-black m-1"></div>
      <div className="w-full h-full p-[2%] overflow-y-auto">
        {floodData.map((flood, index) => (
          <FloodWarningDetails
            key={index}
            location={flood.location}
            waterLevel={flood.waterLevel}
            updateDate={flood.updateDate}
            updateTimeString={flood.updateTimeString}
            RainStatus={flood.RainStatus}
            Rainfall={flood.Rainfall}
            WindSpeed={flood.WindSpeed}
          />
        ))}
      </div>
    </div>
  );
};

export default FloodWarningComponent;

