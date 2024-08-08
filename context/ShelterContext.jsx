// /app/context/ShelterContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

const ShelterContext = createContext();

export const ShelterProvider = ({ children }) => {
  const [shelters, setShelters] = useState([]);
  const db = getFirestore(app);

  const fetchShelters = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Availability"));
      const sheltersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShelters(sheltersData);
    } catch (error) {
      console.error("Error fetching shelters: ", error);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  return (
    <ShelterContext.Provider value={{ shelters, setShelters, fetchShelters }}>
      {children}
    </ShelterContext.Provider>
  );
};

export const useShelters = () => {
  return useContext(ShelterContext);
};
