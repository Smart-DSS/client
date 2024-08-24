'use client'

// components/PlotComponent.js
import { useEffect, useState } from 'react';

export default function PlotComponent() {
    const [plotUrl, setPlotUrl] = useState(null);

    useEffect(() => {
        // Fetch the plot image from the Flask backend
        // fetch('http://localhost:8080/clogging')
        fetch('http://localhost:8080/otherplot')
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
