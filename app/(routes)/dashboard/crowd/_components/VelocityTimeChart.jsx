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
// import TimeFilterDropdown from "./TimeFilterDropdown"; // Import the TimeFilterDropdown component

// const VelocityTimeChart = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   // Fetch data from the API
//   const fetchCrowdData = async () => {
//     try {
//       const response = await fetch('/api/crowd-data');
//       const result = await response.json();
//       // Transform the data into the format needed for the chart
//       const formattedData = result.map(item => ({
//         time: dayjs(item.timestamp).format('YYYY-MM-DD HH:mm:ss'),
//         velocity: item.velocity_camera, // Assuming person_count represents velocity
//       }));
//       setData(formattedData);
//       setFilteredData(formattedData);
//     } catch (error) {
//       console.error("Failed to fetch crowd data:", error);
//     }
//   };

//   // Filter the data based on the selected period
//   const filterData = (period) => {
//     const now = dayjs();
//     let filtered;
//     switch (period) {
//       case "Last hour":
//         filtered = data.filter((d) => now.diff(dayjs(d.time), "hour") < 1);
//         break;
//       case "Today":
//         filtered = data.filter((d) => dayjs(d.time).isSame(now, "day"));
//         break;
//       case "This week":
//         filtered = data.filter((d) => dayjs(d.time).isSame(now, "week"));
//         break;
//       case "This month":
//         filtered = data.filter((d) => dayjs(d.time).isSame(now, "month"));
//         break;
//       default:
//         filtered = data;
//     }
//     setFilteredData(filtered);
//   };

//   useEffect(() => {
//     fetchCrowdData();
//   }, []);

//   return (
//     <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col mx-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
//       <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
//         <div>Overview</div>
//       </div>
//       <div className="w-full h-[0px] border border-black m-1"></div>
//       <div className="w-full flex justify-end my-2">
//         <TimeFilterDropdown onFilterChange={filterData} /> {/* Dropdown for selecting time period */}
//       </div>
//       <div className="w-full h-full p-[2%] overflow-y-auto">
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={filteredData}>
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
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="velocity"
//               stroke="#8884d8"
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default VelocityTimeChart;


import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import TimeFilterDropdown from "./TimeFilterDropdown";

// Create CameraFilterDropdown component
const CameraFilterDropdown = ({ cameras, selectedCamera, onCameraChange }) => (
  <select
    // className="border p-1 rounded"
    className="inline-flex w-12 justify-between px-2 bg-gray-100 hover:bg-gray-200 text-black rounded-full cursor-pointer"
    value={selectedCamera}
    onChange={(e) => onCameraChange(e.target.value)}
  >
    {cameras.map((cameraId) => (
      <option key={cameraId} value={cameraId}>
        {cameraId} camera 
      </option>
    ))}
  </select>
);

const VelocityTimeChart = () => {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [selectedCamera, setSelectedCamera] = useState(null);

  // Fetch data from the API
  const fetchCrowdData = async () => {
    try {
      const response = await fetch('/api/crowd-data');
      const result = await response.json();

      // Group data by 'Person ID' and 'Camera ID'
      const groupedData = result.reduce((acc, item) => {
        const personId = item.person_id;
        const cameraId = item.camera_id; // Assuming 'camera_id' is the key
        const formattedItem = {
          time: dayjs(item.timestamp).format('YYYY-MM-DD HH:mm:ss'),
          velocity: item.velocity_camera, // Assuming 'velocity_camera' is the velocity
        };

        if (!acc[cameraId]) {
          acc[cameraId] = {};
        }
        if (!acc[cameraId][personId]) {
          acc[cameraId][personId] = [];
        }
        acc[cameraId][personId].push(formattedItem);
        return acc;
      }, {});

      setData(groupedData);
      setFilteredData(groupedData);
      setSelectedCamera(Object.keys(groupedData)[0]); // Default to the first camera
    } catch (error) {
      console.error("Failed to fetch crowd data:", error);
    }
  };

  // Filter the data based on the selected period and camera
  const filterData = (period) => {
    const now = dayjs();
    const filtered = {};

    if (selectedCamera && data[selectedCamera]) {
      Object.keys(data[selectedCamera]).forEach(personId => {
        filtered[personId] = data[selectedCamera][personId].filter((d) => {
          switch (period) {
            case "Last hour":
              return now.diff(dayjs(d.time), "hour") < 1;
            case "Today":
              return dayjs(d.time).isSame(now, "day");
            case "This week":
              return dayjs(d.time).isSame(now, "week");
            case "This month":
              return dayjs(d.time).isSame(now, "month");
            default:
              return true;
          }
        });
      });
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchCrowdData();
  }, []);

  useEffect(() => {
    filterData("Today"); // Apply initial filter based on selected camera and default time period
  }, [selectedCamera]);

  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col mx-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
        <div>Overview</div>
      </div>
      <div className="w-full h-[0px] border border-black m-1"></div>
      <div className="w-full flex justify-between my-2">
        <CameraFilterDropdown
          cameras={Object.keys(data)}
          selectedCamera={selectedCamera}
          onCameraChange={setSelectedCamera}
        />
        <TimeFilterDropdown onFilterChange={filterData} />
      </div>
      <div className="w-full h-full p-[2%] overflow-y-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: "Time",
                position: "insideBottomRight",
                offset: 0,
              }}
              tickFormatter={(tick) => dayjs(tick).format('HH:mm')}
            />
            <YAxis
              label={{
                value: "Velocity (m/s)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            {/* <Legend
              wrapperStyle={{
                fontSize: '12px',
                marginTop: '10px',
              }}
            /> */}
            {Object.keys(filteredData).map(personId => (
              <Line
                key={personId}
                type="monotone"
                dataKey="velocity"
                data={filteredData[personId]}
                stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                name={`ID ${personId}`}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VelocityTimeChart;
