// /app/dashboard/_components/ShelterForm.jsx

import React, { useState } from "react";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useShelters } from "@/context/ShelterContext";

const ShelterForm = ({ onClose }) => {
  const db = getFirestore(app);
  const { fetchShelters } = useShelters();
  const [shelterDetails, setShelterDetails] = useState({
    id: "",
    name: "",
    lat: "",
    lng: "",
    availableCount: 0,
    food: 0,
    water: 0,
    meds: 0,
    accommodationLeft: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShelterDetails({
      ...shelterDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, lat, lng, availableCount, food, water, meds, accommodationLeft } = shelterDetails;
    const position = { lat: parseFloat(lat), lng: parseFloat(lng) };

    try {
      await setDoc(doc(db, "Availability", name), {
        id,
        name,
        position,
        availableCount: parseInt(availableCount),
        food: parseInt(food),
        water: parseInt(water),
        meds: parseInt(meds),
        accommodationLeft: parseInt(accommodationLeft),
      });
      fetchShelters();
      onClose();
    } catch (error) {
      console.error("Error adding shelter: ", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-lg font-semibold mb-4">Add Shelter</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                name="id"
                value={shelterDetails.id}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={shelterDetails.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                type="number"
                step="0.000001"
                name="lat"
                value={shelterDetails.lat}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                type="number"
                step="0.000001"
                name="lng"
                value={shelterDetails.lng}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Available Count</label>
              <input
                type="number"
                name="availableCount"
                value={shelterDetails.availableCount}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Food (days)</label>
              <input
                type="number"
                name="food"
                value={shelterDetails.food}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Water (days)</label>
              <input
                type="number"
                name="water"
                value={shelterDetails.water}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Meds (days)</label>
              <input
                type="number"
                name="meds"
                value={shelterDetails.meds}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium text-gray-700">Accommodation Left</label>
              <input
                type="number"
                name="accommodationLeft"
                value={shelterDetails.accommodationLeft}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Shelter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShelterForm;
