"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const RealTimeDataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io("http://localhost:8080");

    // Listen for initial data
    socket.on("initial_data", (initialData) => {
      console.log("Received initial data:", initialData);
      setData(initialData);
    });

    // Listen for real-time updates
    socket.on("new_crowd_data", (newData) => {
      console.log("Received new crowd data:", newData);
      setData(newData);
    });

    // Clean up the connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Crowd Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Camera ID: {item.camera_id}, Count: {item.count_camera}, Timestamp:{" "}
            {item.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeDataComponent;
