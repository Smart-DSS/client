import { app } from "@/config/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const FloodDetails = () => {
  const db = getFirestore(app);
  const [rainStatus, setRainStatus] = useState("Not Raining");
  const [rainfall, setRainfall] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [waterLevel, setWaterLevel] = useState();
  const [updateDate, setUpdateDate] = useState();
  const [updateTimeString, setUpdateTimeString] = useState();

  const getFloodData = async () => {
    const docRef = doc(db, "Flood-data", "EWS-Main");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRainStatus(
          docSnap.data()?.RainStatus == 1 ? "Raining" : "Not Raining"
        );
        setWaterLevel(docSnap.data()?.waterLevel);
        setRainfall(docSnap.data()?.Rainfall);
        setWindSpeed(docSnap.data()?.WindSpeed);
        setUpdateDate(docSnap.data()?.updateDate);
        setUpdateTimeString(docSnap.data()?.updateTimeString);
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
    <div className="relative flex justify-center p-[1%]">
      <div className="w-full h-24 bg-gray-50 rounded-[15px] flex justify-between p-[5%] hover:bg-gray-100 hover:scale-105 hover:cursor-pointer">
        <div className="flex flex-col justify-center w-[50%]">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            EWS-Main
          </div>
          <div className="text-blue-900">{rainStatus}</div>
          <div className="text-xs">
            <p>rainfall: {rainfall}</p>
            <p>windSpeed: {windSpeed}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            Water Level:
          </div>
          <div className="text-black text-3xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
            {((parseFloat(waterLevel) / 255) * 100).toFixed(2)}%
          </div>
          {updateDate && updateTimeString && (
            <div className="text-gray-500 text-xxxs font-['Radio Canada'] tracking-wide flex justify-end mt-2">
              Last updated: {updateDate} {updateTimeString}
            </div>
          )}
        </div>
      </div>

      {/* {parseFloat(waterLevel) > 200 && ( */}
      {((parseFloat(waterLevel) / 255) * 100).toFixed(2) > 50 && (
        <div className="absolute top-[-5%] right-[-2%] bg-red-600 text-white rounded-full py-2 px-8 gap-1 w-[10%] h-[10%] flex items-center justify-center border-red-500 border-2">
          <div>Alert</div>
          <div className="text-yellow-300">⚠️</div>
        </div>
      )}
    </div>
  );
};

export default FloodDetails;
