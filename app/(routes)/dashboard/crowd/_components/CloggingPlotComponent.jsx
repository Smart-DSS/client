'use client'

// components/CloggingPlotComponent.js
import { useEffect, useState } from 'react';

export default function CloggingPlotComponent() {
    const [plotUrl, setPlotUrl] = useState(null);

    useEffect(() => {
        // Function to fetch the plot image from the Flask backend
        const fetchPlot = () => {
            fetch('http://localhost:8080/clogging')
                .then(response => response.blob())
                .then(blob => {
                    // Create a URL for the blob image
                    const url = URL.createObjectURL(blob);
                    setPlotUrl(url);
                })
                .catch(error => {
                    console.error('Error fetching the plot:', error);
                });
        };

        // Fetch the plot initially
        fetchPlot();

        // Set up an interval to fetch the plot every 2 minutes (120000 milliseconds)
        // const intervalId = setInterval(fetchPlot, 120000);
        const intervalId = setInterval(fetchPlot, 5000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1 className='bg-gray-50 px-2 py-1 rounded-full'>Clogging Plot Display</h1>
            {plotUrl ? (
                <img src={plotUrl} alt="Plot" />
            ) : (
                <p>Loading plot...</p>
            )}
        </div>
    );
}
