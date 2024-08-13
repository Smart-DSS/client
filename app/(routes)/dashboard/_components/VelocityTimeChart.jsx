import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { time: '18:02:07', velocity: 0 },
    { time: '18:02:08', velocity: 5 },
    { time: '18:02:09', velocity: 10 },
    { time: '18:02:10', velocity: 20 },
    { time: '18:02:11', velocity: 40 },
    { time: '18:02:12', velocity: 35 },
    { time: '18:02:13', velocity: 25 },
    { time: '18:02:14', velocity: 18 },
    { time: '18:02:15', velocity: 20 },
    { time: '18:02:16', velocity: 15 },
    { time: '18:02:17', velocity: 10 },
    { time: '18:02:18', velocity: 8 },
    { time: '18:02:19', velocity: 6 },
    { time: '18:02:20', velocity: 10 },
    { time: '18:02:21', velocity: 12 },
    { time: '18:02:22', velocity: 5 },
    { time: '18:02:23', velocity: 2 },
    { time: '18:02:24', velocity: 1 },
    { time: '18:02:25', velocity: 0 },
    { time: '18:02:26', velocity: 0 },
    { time: '18:02:27', velocity: 0 },
  ];
  

const VelocityTimeChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Velocity (m/s)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="velocity" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VelocityTimeChart;
