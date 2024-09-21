import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CrowdDetails from "./CrowdDetails";

const CrowdComponent = () => {
  const [crowdData, setCrowdData] = useState([]);

  // const getCrowdData = async () => {
  //   try {
  //     const data = await fetch('/api/crowd-data');
  //     const result = await data.json();

  //     // Group the data by camera_id and keep the entry with the latest id for each
  //     const latestCrowdData = Object.values(
  //       result.reduce((acc, current) => {
  //         const existing = acc[current.camera_id];

  //         // Compare the id to determine the latest entry
  //         if (!existing || existing.id < current.id) {
  //           acc[current.camera_id] = current;
  //         }
  //         return acc;
  //       }, {})
  //     );
  //     console.log(latestCrowdData);
  //     // Set the formatted data to the state
  //     setCrowdData(latestCrowdData);
  //   } catch (error) {
  //     console.error("Failed to fetch crowd data:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch data when component mounts
  //   getCrowdData();

  //   // Polling every 5 seconds
  //   const intervalId = setInterval(getCrowdData, 1000);

  //   // Cleanup on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
        <div>CCTV Details</div>
      </div>
      <div className="w-full h-[0px] border border-black m-1"></div>
      <div className="w-full h-full p-[2%] overflow-y-auto">
        {/* {crowdData.map((data) => (
          <CrowdDetails
            key={data.camera_id}
            camera_id={data.camera_id}
            person_count={data.count_camera}
            timestamp={dayjs(data.timestamp).format('YYYY-MM-DD HH:mm:ss')}
          />
        ))} */}
        <CrowdDetails
          key='1'
          camera_id='1'
          person_count='2'
          timestamp="2024-09-20 14:51:05"
        />
        <CrowdDetails
          key='2'
          camera_id='2'
          person_count='9'
          timestamp="2024-09-20 14:51:05"
        />
        <CrowdDetails
          key='3'
          camera_id='3'
          person_count='4'
          timestamp="2024-09-20 14:51:05"
        />
        
      </div>
    </div>
  );
};

export default CrowdComponent;

// try 3

// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import CrowdDetails from "./CrowdDetails";

// const CrowdComponent = () => {
//   const [crowdData, setCrowdData] = useState([]);

//   const handleNewCrowdData = (newData) => {
//     const parsedData = JSON.parse(newData);

//     // Update the state with the latest crowd data
//     setCrowdData(parsedData);
//   };

//   useEffect(() => {
//     console.log("starts")
//     // const socket = new WebSocket('ws://192.168.120.40:8080/socket.io');
//     const socket = new WebSocket('ws://localhost:8080/socket.io');

//     socket.onmessage = (event) => {
//       handleNewCrowdData(event.data);
//     };
//     console.log("ends")

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     // Cleanup on component unmount
//     return () => {
//       socket.close();
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

// try 2

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

// try 4 - max count_in last 5 entries
// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import CrowdDetails from "./CrowdDetails";

// const CrowdComponent = () => {
//   const [crowdData, setCrowdData] = useState([]);

//   const getCrowdData = async () => {
//     try {
//       const data = await fetch('/api/crowd-data');
//       const result = await data.json();

//       // Group the data by camera_id
//       const groupedData = result.reduce((acc, current) => {
//         if (!acc[current.camera_id]) {
//           acc[current.camera_id] = [];
//         }
//         acc[current.camera_id].push(current);
//         return acc;
//       }, {});

//       // Process each group to find the max count_camera in the last 5 entries
//       const latestCrowdData = Object.values(groupedData).map(group => {
//         // Sort the group by id or timestamp (whichever reflects the latest entry)
//         group.sort((a, b) => b.id - a.id); // Assuming higher id means more recent

//         // Get the last 5 entries and find the max count_camera
//         const last5Entries = group.slice(0, 5);
//         const maxCountCamera = Math.max(...last5Entries.map(entry => entry.count_camera));

//         // Return the most recent entry with the max count_camera
//         return {
//           ...group[0],
//           count_camera: maxCountCamera,
//         };
//       });

//       console.log(latestCrowdData);
//       setCrowdData(latestCrowdData);
//     } catch (error) {
//       console.error("Failed to fetch crowd data:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch data when component mounts
//     getCrowdData();

//     // Polling every 5 seconds
//     const intervalId = setInterval(getCrowdData, 5000);

//     // Cleanup on component unmount
//     return () => clearInterval(intervalId);
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

// try 4 - connect using working flask code

// "use client";

// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import CrowdDetails from "./CrowdDetails";
// import io from "socket.io-client";

// const CrowdComponent = () => {
//   const [crowdData, setCrowdData] = useState([]);

//   useEffect(() => {
//     // Establish WebSocket connection
//     const socket = io("http://localhost:8080");

//     // Listen for the initial data when the connection is established
//     socket.on("initial_data", (data) => {
//       console.log("Initial data received:", data);
//       setCrowdData(data);
//     });

//     // Listen for new data from the server
//     socket.on("new_crowd_data", (data) => {
//       console.log("New data received:", data);
//       setCrowdData(data);
//     });

//     // Cleanup when the component unmounts
//     return () => {
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
