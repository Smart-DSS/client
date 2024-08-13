// /app/dashboard/_components/CrowdDetails.jsx

import { app } from "@/config/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const CrowdDetails = () => {
  const db = getFirestore(app);
  const [camera_id, setCamera_id] = useState();
  const [person_count, setPerson_count] = useState();
  const [timestamp, setTimestamp] = useState();
  const getCrowdData = async () => {
    const docRef = doc(db, "real_time_data", "crowd");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCamera_id(docSnap.data()?.camera_id);
        setPerson_count(docSnap.data()?.person_count);
        setTimestamp(docSnap.data()?.timestamp);
      } else {
        console.log("No such stage!");
      }
    } catch (error) {
      console.log("No such stage!");
    }
  };

  useEffect(() => {
    getCrowdData();
  }, []);

  const getColor = () => {
    return "text-blue-900";
    // if (value > 20) {
    //   return "text-red-600";
    // } else if (value > 10) {
    //   return "text-orange-600";
    // } else {
    //   return "text-green-600";
    // }
  };

  return (
    <div className="flex justify-center p-[1%]">
      <div className="w-full h-28 bg-[#f1f1f1] rounded-[15px] flex justify-between p-[5%] hover:scale-105 hover:cursor-pointer">
        <div className="flex flex-col justify-centern w-[50%]">
          <div className="flex flex-col justify-center">
            <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
              SM street:
            </div>
            <div>
              <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
                camera_id:{" "}
              </span>
              <span
                className={`text-xs font-semibold font-['Radio Canada'] tracking-wide ${getColor()}`}
              >
                {camera_id}
                <br />
              </span>
              <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
                Time:{" "}
              </span>
              <span
                className={`text-xs font-semibold font-['Radio Canada'] tracking-wide ${getColor()}`}
              >
                {timestamp && typeof timestamp === 'string' ? timestamp.split(' ')[1] : ''}
                <br />
              </span>
              <span className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
                Date:{" "}
              </span>
              <span
                className={`text-xs font-semibold font-['Radio Canada'] tracking-wide ${getColor()}`}
              >
                {timestamp && typeof timestamp === 'string' ? timestamp.split(' ')[0] : ''}
                <br />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-black text-xs font-semibold font-['Radio Canada'] tracking-wide">
            Person count:
          </div>
          <div className="text-black text-5xl font-semibold font-['Radio Canada'] tracking-widest flex justify-center">
            {person_count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdDetails;
