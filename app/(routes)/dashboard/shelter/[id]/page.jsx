"use client"

import React, { useState, useEffect } from "react";
import ShelterDetails from "../../_components/ShelterDetails";

const ShelterPage = ({ params }) => {
  const { id } = params;

  const [shelter, setShelter] = useState(null);

  useEffect(() => {
    // Fetch shelter details based on id
    const fetchShelter = async () => {
      // Replace with actual data fetching logic
      const data = {
        id,
        name: `Shelter ${id}`,
        food: 41,
        water: 51,
        meds: 36,
        accommodationLeft: 46,
        position: { lat: 37.7749, lng: -122.4194 },
      };
      setShelter(data);
    };

    fetchShelter();
  }, [id]);

  const handleGetDirections = () => {
    if (shelter) {
      const { lat, lng } = shelter.position;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  if (!shelter) return <div>Loading...</div>;

  return (
    <div>
      <h1>{shelter.name}</h1>
      <ShelterDetails {...shelter} />
      <button onClick={handleGetDirections}>Get Directions</button>
    </div>
  );
};

export default ShelterPage;
