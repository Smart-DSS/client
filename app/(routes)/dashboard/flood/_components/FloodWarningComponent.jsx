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
        data.push({ location: doc.id, waterLevel: doc.data().waterLevel });
      });
      
      // Sort data in descending order of water level
      data.sort((a, b) => b.waterLevel - a.waterLevel);
      
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
          />
        ))}
      </div>
    </div>
  );
};

export default FloodWarningComponent;
