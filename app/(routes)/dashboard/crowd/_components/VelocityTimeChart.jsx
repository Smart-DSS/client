import React, { useState } from "react";
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
import TimeFilterDropdown from "./TimeFilterDropdown"; // Import the TimeFilterDropdown component

const data = [
  // Last hour data (9:00 AM to 10:00 AM)
  { time: "2024-08-17 09:01:00", velocity: 0 },
  { time: "2024-08-17 09:05:00", velocity: 5 },
  { time: "2024-08-17 09:10:00", velocity: 10 },
  { time: "2024-08-17 09:15:00", velocity: 20 },
  { time: "2024-08-17 09:20:00", velocity: 30 },
  { time: "2024-08-17 09:25:00", velocity: 25 },
  { time: "2024-08-17 09:30:00", velocity: 18 },
  { time: "2024-08-17 09:35:00", velocity: 20 },
  { time: "2024-08-17 09:40:00", velocity: 15 },
  { time: "2024-08-17 09:45:00", velocity: 10 },
  { time: "2024-08-17 09:50:00", velocity: 5 },
  { time: "2024-08-17 09:55:00", velocity: 3 },
  { time: "2024-08-17 09:59:00", velocity: 0 },

  // Today (17th August, earlier times)
  { time: "2024-08-17 06:00:00", velocity: 0 },
  { time: "2024-08-17 06:30:00", velocity: 10 },
  { time: "2024-08-17 07:00:00", velocity: 15 },
  { time: "2024-08-17 07:30:00", velocity: 20 },
  { time: "2024-08-17 08:00:00", velocity: 30 },
  { time: "2024-08-17 08:30:00", velocity: 25 },
  { time: "2024-08-17 08:45:00", velocity: 22 },
  { time: "2024-08-17 09:00:00", velocity: 18 },

  // This week (Earlier this week)
  { time: "2024-08-16 14:00:00", velocity: 10 },
  { time: "2024-08-16 15:00:00", velocity: 20 },
  { time: "2024-08-16 16:00:00", velocity: 25 },
  { time: "2024-08-16 17:00:00", velocity: 18 },
  { time: "2024-08-15 10:00:00", velocity: 22 },
  { time: "2024-08-15 12:00:00", velocity: 15 },
  { time: "2024-08-15 14:00:00", velocity: 20 },
  { time: "2024-08-15 16:00:00", velocity: 30 },
  { time: "2024-08-14 10:00:00", velocity: 25 },
  { time: "2024-08-14 12:00:00", velocity: 10 },

  // This month (Earlier this month)
  { time: "2024-08-10 08:00:00", velocity: 0 },
  { time: "2024-08-09 09:00:00", velocity: 5 },
  { time: "2024-08-08 10:00:00", velocity: 10 },
  { time: "2024-08-07 11:00:00", velocity: 15 },
  { time: "2024-08-06 12:00:00", velocity: 20 },
  { time: "2024-08-05 13:00:00", velocity: 25 },
  { time: "2024-08-04 14:00:00", velocity: 30 },
  { time: "2024-08-03 15:00:00", velocity: 35 },
  { time: "2024-08-02 16:00:00", velocity: 40 },
  { time: "2024-08-01 17:00:00", velocity: 20 },

  // Earlier in this month (rest of the data)
  { time: "2024-07-31 10:00:00", velocity: 15 },
  { time: "2024-07-30 10:00:00", velocity: 12 },
  { time: "2024-07-29 10:00:00", velocity: 10 },
  { time: "2024-07-28 10:00:00", velocity: 8 },
  { time: "2024-07-27 10:00:00", velocity: 5 },
  { time: "2024-07-26 10:00:00", velocity: 3 },
  { time: "2024-07-25 10:00:00", velocity: 0 },
  { time: "2024-07-24 10:00:00", velocity: 10 },
  { time: "2024-07-23 10:00:00", velocity: 20 },
  { time: "2024-07-22 10:00:00", velocity: 15 },
];


const VelocityTimeChart = () => {
  const [filteredData, setFilteredData] = useState(data);

  const filterData = (period) => {
    const now = dayjs();
    let filtered;
    switch (period) {
      case "Last hour":
        filtered = data.filter((d) => now.diff(dayjs(d.time), "hour") < 1);
        break;
      case "Today":
        filtered = data.filter((d) => dayjs(d.time).isSame(now, "day"));
        break;
      case "This week":
        filtered = data.filter((d) => dayjs(d.time).isSame(now, "week"));
        break;
      case "This month":
        filtered = data.filter((d) => dayjs(d.time).isSame(now, "month"));
        break;
      default:
        filtered = data;
    }
    setFilteredData(filtered);
  };

  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col mx-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
        <div>Overview</div>
      </div>
      <div className="w-full h-[0px] border border-black m-1"></div>
      <div className="w-full flex justify-end my-2">
        <TimeFilterDropdown onFilterChange={filterData} /> {/* Dropdown for selecting time period */}
      </div>
      <div className="w-full h-full p-[2%] overflow-y-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: "Time (s)",
                position: "insideBottomRight",
                offset: 0,
              }}
            />
            <YAxis
              label={{
                value: "Velocity (m/s)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="velocity"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VelocityTimeChart;
