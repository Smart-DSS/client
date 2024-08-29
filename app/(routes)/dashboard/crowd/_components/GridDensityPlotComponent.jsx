'use client'

// components/GridDensityPlotComponent.js
import { useEffect, useState } from 'react';

export default function GridDensityPlotComponent() {
    const [plotUrl, setPlotUrl] = useState(null);

    useEffect(() => {
        // Function to fetch the plot image from the Flask backend
        const fetchPlot = () => {
            fetch('https://test-uksez4pcka-el.a.run.app/grid_density')
            // fetch('http://localhost:8080/grid_density')
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

        // Set up an interval to fetch the plot every 5 seconds (5000 milliseconds)
        const intervalId = setInterval(fetchPlot, 5000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1 className='bg-gray-50 px-2 py-1 rounded-full'>Grid Density Plot Display</h1>
            {plotUrl ? (
                <img src={plotUrl} alt="Plot" />
            ) : (
                <p>Loading plot...</p>
            )}
        </div>
    );
}
