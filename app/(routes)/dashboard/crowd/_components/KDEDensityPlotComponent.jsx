"use client";

import Image from "next/image";
// components/KDEDensityPlotComponent.js
import { useEffect, useState } from "react";

export default function KDEDensityPlotComponent() {
  const [plotUrl, setPlotUrl] = useState(null);

  // useEffect(() => {
  //     // Function to fetch the plot image from the Flask backend
  //     const fetchPlot = () => {
  //         // fetch('https://test-uksez4pcka-el.a.run.app/kde_density')
  //         fetch('https://test-223005939796.asia-south1.run.app/kde_density')
  //         // fetch('http://localhost:8080/kde_density')
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
    <div>
      <h1 className="bg-gray-50 px-2 py-1 rounded-full">
        KDE Density Plot Display
      </h1>
      {/* {plotUrl ? (
                <img src={plotUrl} alt="Plot" />
            ) : (
                <p>Loading plot...</p>
            )} */}
      <Image
        src="/KDEDensityPlotComponent.png" // or use an external URL
        alt="Description of the image"
        width={500} // set width
        height={300} // set height
        priority // Optional: for preloading the image
      />
    </div>
  );
}
