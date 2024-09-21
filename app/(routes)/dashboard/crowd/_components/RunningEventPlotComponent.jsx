"use client";

import Image from "next/image";
// components/RunningEventPlotComponent.js
import { useEffect, useState } from "react";

export default function RunningEventPlotComponent() {
  const [plotUrl, setPlotUrl] = useState(null);

  // useEffect(() => {
  //     // Function to fetch the plot image from the Flask backend
  //     const fetchPlot = () => {
  //         // fetch('https://test-uksez4pcka-el.a.run.app/running_event')
  //         fetch('https://test-223005939796.asia-south1.run.app/running_event')
  //         // fetch('http://localhost:8080/running_event')
  //             .then(response => response.blob())
  //             .then(blob => {
  //                 // Create a URL for the blob image
  //                 const url = URL.createObjectURL(blob);
  //                 setPlotUrl(url);
  //             })
  //             .catch(error => {
  //                 console.error('Error fetching the plot:', error);
  //             });
  //     };

  //     // Fetch the plot initially
  //     fetchPlot();

  //     // Set up an interval to fetch the plot every 5 seconds (5000 milliseconds)
  //     // const intervalId = setInterval(fetchPlot, 3000);

  //     // Clean up the interval when the component unmounts
  //     // return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="bg-gray-50 px-2 py-1 rounded-full">
      <h1>Running Event/Divergence Plot Display</h1>
      {/* {plotUrl ? (
                <img src={plotUrl} alt="Plot" />
            ) : (
                <p>Loading plot...</p>
            )} */}
      <Image
        src="/RunningEventPlotComponent.png" // or use an external URL
        alt="Description of the image"
        width={500} // set width
        height={300} // set height
        priority // Optional: for preloading the image
      />
    </div>
  );
}
