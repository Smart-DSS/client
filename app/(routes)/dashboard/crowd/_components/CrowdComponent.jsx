
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CrowdDetails from "./CrowdDetails";

const CrowdComponent = () => {
  const [crowdData, setCrowdData] = useState([]);

  const getCrowdData = async () => {
    try {
      const data = await fetch('/api/crowd-data');
      const result = await data.json();

      // Group the data by camera_id and keep the entry with the latest id for each
      const latestCrowdData = Object.values(
        result.reduce((acc, current) => {
          const existing = acc[current.camera_id];
      
          // Compare the id to determine the latest entry
          if (!existing || existing.id < current.id) {
            acc[current.camera_id] = current;
          }
          return acc;
        }, {})
      );
      console.log(latestCrowdData);
      // Set the formatted data to the state
      setCrowdData(latestCrowdData);
    } catch (error) {
      console.error("Failed to fetch crowd data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
    getCrowdData();

    // Polling every 5 seconds
    const intervalId = setInterval(getCrowdData, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
        <div>CCTV Details</div>
      </div>
      <div className="w-full h-[0px] border border-black m-1"></div>
      <div className="w-full h-full p-[2%] overflow-y-auto">
        {crowdData.map((data) => (
          <CrowdDetails
            key={data.camera_id}
            camera_id={data.camera_id}
            person_count={data.count_camera}
            timestamp={dayjs(data.timestamp).format('YYYY-MM-DD HH:mm:ss')}
          />
        ))}
      </div>
    </div>
  );
};

export default CrowdComponent;



// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import CrowdDetails from "./CrowdDetails";
// import io from "socket.io-client";

// const CrowdComponent = () => {
//   const [crowdData, setCrowdData] = useState([]);

//   useEffect(() => {
//     console.log("Connecting to WebSocket server...");
//     const socket = io("http://0.0.0.0:8080");

//     socket.on("connect", () => {
//       console.log("WebSocket connection established!");

//       // Request the initial data from the server
//       socket.emit('request_initial_data');
//     });

//     socket.on("initial_data", (result) => {
//       console.log("Received initial crowd data:", result);

//       // Group the data by camera_id and keep the entry with the latest id for each
//       const latestCrowdData = Object.values(
//         result.reduce((acc, current) => {
//           const existing = acc[current.camera_id];
          
//           if (!existing || existing.id < current.id) {
//             acc[current.camera_id] = current;
//           }
//           return acc;
//         }, {})
//       );

//       console.log("Latest crowd data:", latestCrowdData);
//       setCrowdData(latestCrowdData);
//     });

//     socket.on("new_crowd_data", (result) => {
//       console.log("Received new crowd data:", result);

//       // Group the data by camera_id and keep the entry with the latest id for each
//       const latestCrowdData = Object.values(
//         result.reduce((acc, current) => {
//           const existing = acc[current.camera_id];
          
//           if (!existing || existing.id < current.id) {
//             acc[current.camera_id] = current;
//           }
//           return acc;
//         }, {})
//       );
//       print("Latest crowd data:", latestCrowdData)
//       console.log("Latest crowd data:", latestCrowdData);
//       setCrowdData(latestCrowdData);
//     });

//     socket.on("disconnect", () => {
//       console.log("WebSocket connection disconnected.");
//     });

//     // Cleanup WebSocket connection when component unmounts
//     return () => {
//       console.log("Disconnecting from WebSocket server...");
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
//       <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
//         <div>CCTV Details</div>
//       </div>
//       <div className="w-full h-[0px] border border-black m-1"></div>
//       <div className="w-full h-full p-[2%] overflow-y-auto">
//         {crowdData.map((data) => (
//           <CrowdDetails
//             key={data.camera_id}
//             camera_id={data.camera_id}
//             person_count={data.count_camera}
//             timestamp={dayjs(data.timestamp).format('YYYY-MM-DD HH:mm:ss')}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CrowdComponent;
