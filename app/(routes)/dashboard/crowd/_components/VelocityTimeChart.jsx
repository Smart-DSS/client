// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//     { time: '18:02:07', velocity: 0 },
//     { time: '18:02:08', velocity: 5 },
//     { time: '18:02:09', velocity: 10 },
//     { time: '18:02:10', velocity: 20 },
//     { time: '18:02:11', velocity: 40 },
//     { time: '18:02:12', velocity: 35 },
//     { time: '18:02:13', velocity: 25 },
//     { time: '18:02:14', velocity: 18 },
//     { time: '18:02:15', velocity: 20 },
//     { time: '18:02:16', velocity: 15 },
//     { time: '18:02:17', velocity: 10 },
//     { time: '18:02:18', velocity: 8 },
//     { time: '18:02:19', velocity: 6 },
//     { time: '18:02:20', velocity: 10 },
//     { time: '18:02:21', velocity: 12 },
//     { time: '18:02:22', velocity: 5 },
//     { time: '18:02:23', velocity: 2 },
//     { time: '18:02:24', velocity: 1 },
//     { time: '18:02:25', velocity: 0 },
//     { time: '18:02:26', velocity: 0 },
//     { time: '18:02:27', velocity: 0 },
//   ];


// const VelocityTimeChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottomRight', offset: 0 }} />
//         <YAxis label={{ value: 'Velocity (m/s)', angle: -90, position: 'insideLeft' }} />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="velocity" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default VelocityTimeChart;


// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import dayjs from "dayjs";
// import TimeFilterDropdown from "./TimeFilterDropdown";

// // Create CameraFilterDropdown component
// const CameraFilterDropdown = ({ cameras, selectedCamera, onCameraChange }) => (
//   <select
//     // className="border p-1 rounded"
//     className="inline-flex w-12 justify-between px-2 bg-gray-100 hover:bg-gray-200 text-black rounded-full cursor-pointer"
//     value={selectedCamera}
//     onChange={(e) => onCameraChange(e.target.value)}
//   >
//     {cameras.map((cameraId) => (
//       <option key={cameraId} value={cameraId}>
//         {cameraId} camera 
//       </option>
//     ))}
//   </select>
// );

// const VelocityTimeChart = () => {
//   const [data, setData] = useState({});
//   const [filteredData, setFilteredData] = useState({});
//   const [selectedCamera, setSelectedCamera] = useState(null);

//   // Fetch data from the API
//   const fetchCrowdData = async () => {
//     try {
//       const response = await fetch('/api/crowd-data');
//       const result = await response.json();

//       // Group data by 'Person ID' and 'Camera ID'
//       const groupedData = result.reduce((acc, item) => {
//         const personId = item.person_id;
//         const cameraId = item.camera_id; // Assuming 'camera_id' is the key
//         const formattedItem = {
//           time: dayjs(item.timestamp).format('YYYY-MM-DD HH:mm:ss'),
//           velocity: item.velocity_camera, // Assuming 'velocity_camera' is the velocity
//         };

//         if (!acc[cameraId]) {
//           acc[cameraId] = {};
//         }
//         if (!acc[cameraId][personId]) {
//           acc[cameraId][personId] = [];
//         }
//         acc[cameraId][personId].push(formattedItem);
//         return acc;
//       }, {});

//       setData(groupedData);
//       setFilteredData(groupedData);
//       setSelectedCamera(Object.keys(groupedData)[0]); // Default to the first camera
//     } catch (error) {
//       console.error("Failed to fetch crowd data:", error);
//     }
//   };

//   // Filter the data based on the selected period and camera
//   const filterData = (period) => {
//     const now = dayjs();
//     const filtered = {};

//     if (selectedCamera && data[selectedCamera]) {
//       Object.keys(data[selectedCamera]).forEach(personId => {
//         filtered[personId] = data[selectedCamera][personId].filter((d) => {
//           switch (period) {
//             case "Last hour":
//               return now.diff(dayjs(d.time), "hour") < 1;
//             case "Today":
//               return dayjs(d.time).isSame(now, "day");
//             case "This week":
//               return dayjs(d.time).isSame(now, "week");
//             case "This month":
//               return dayjs(d.time).isSame(now, "month");
//             default:
//               return true;
//           }
//         });
//       });
//     }

//     setFilteredData(filtered);
//   };

//   useEffect(() => {
//     fetchCrowdData();
//   }, []);

//   useEffect(() => {
//     filterData("Today"); // Apply initial filter based on selected camera and default time period
//   }, [selectedCamera]);

//   return (
//     <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col mx-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
//       <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
//         <div>Overview</div>
//       </div>
//       <div className="w-full h-[0px] border border-black m-1"></div>
//       <div className="w-full flex justify-between my-2">
//         <CameraFilterDropdown
//           cameras={Object.keys(data)}
//           selectedCamera={selectedCamera}
//           onCameraChange={setSelectedCamera}
//         />
//         <TimeFilterDropdown onFilterChange={filterData} />
//       </div>
//       <div className="w-full h-full p-[2%] overflow-y-auto">
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis
//               dataKey="time"
//               label={{
//                 value: "Time",
//                 position: "insideBottomRight",
//                 offset: 0,
//               }}
//               tickFormatter={(tick) => dayjs(tick).format('HH:mm')}
//             />
//             <YAxis
//               label={{
//                 value: "Velocity (m/s)",
//                 angle: -90,
//                 position: "insideLeft",
//               }}
//             />
//             <Tooltip />
//             {/* <Legend
//               wrapperStyle={{
//                 fontSize: '12px',
//                 marginTop: '10px',
//               }}
//             /> */}
//             {Object.keys(filteredData).map(personId => (
//               <Line
//                 key={personId}
//                 type="monotone"
//                 dataKey="velocity"
//                 data={filteredData[personId]}
//                 stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
//                 name={`ID ${personId}`}
//                 activeDot={{ r: 8 }}
//               />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default VelocityTimeChart;



// components/Plot.js (Next.js Component)
import { useEffect, useState } from 'react';

export default function Plot() {
    const [plotUrl, setPlotUrl] = useState(null);

    useEffect(() => {
        // Fetch the plot from the Flask backend
        fetch('http://localhost:5000/plot')
            .then(response => response.blob())
            .then(blob => {
                // Create a URL for the blob image
                const url = URL.createObjectURL(blob);
                setPlotUrl(url);
            })
            .catch(error => {
                console.error('Error fetching the plot:', error);
            });
    }, []);

    return (
        <div>
            <h1>Plot Display</h1>
            {plotUrl ? (
                <img src={plotUrl} alt="Plot" />
            ) : (
                <p>Loading plot...</p>
            )}
        </div>
    );
}
