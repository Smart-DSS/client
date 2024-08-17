// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { useShelters } from "@/context/ShelterContext";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const labelStyles = {
//   textAlign: "end",
//   fontSize: "16px",
//   fontWeight: "600",
//   color: "#333",
// };

// const center = {
//   lat: 11.250761,
//   lng: 75.781807,
// };

// const FloodMapComponent = ({ selectedShelter, setSelectedShelter }) => {
//   const router = useRouter();
//   const { shelters, setShelters } = useShelters();
//   const [userLocation, setUserLocation] = useState(null);
//   const [icon, setIcon] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("Error obtaining location", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const handleMarkerClick = (shelter) => {
//     console.log(shelter)
//     setSelectedShelter(shelter);
//   };

//   const handleDirectionClick = () => {
//     if (selectedShelter && userLocation) {
//       const destination = `${selectedShelter.position.lat},${selectedShelter.position.lng}`;

//       const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destination}`;
//       window.open(directionsUrl, "_blank");

//       setShelters((prevShelters) =>
//         prevShelters.map((shelter) =>
//           shelter.id === selectedShelter.id
//             ? { ...shelter, accommodationLeft: shelter.accommodationLeft - 1 }
//             : shelter
//         )
//       );
//       alert(
//         `Accommodation in ${selectedShelter.name} has reduced to ${
//           selectedShelter.accommodationLeft - 1
//         }`
//       );
//       setSelectedShelter(null);
//     }
//   };

//   const onLoad = (map) => {
//     const iconSize = new window.google.maps.Size(40, 40);
//     setIcon({
//       url: "/shelter.png",
//       scaledSize: iconSize,
//     });
//   };

//   return (
//     <div className="w-full h-[400px] md:h-full border-2 border-black rounded-md p-2">
//       <LoadScript
//         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//         onLoad={onLoad}
//       >
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
//           {shelters.map((shelter) => (
//             <Marker
//               key={shelter.id}
//               position={shelter.position}
//               icon={icon}
//               label={{
//                 ...labelStyles,
//               }}
//               className="w-10"
//               onClick={() => handleMarkerClick(shelter)}
//             />
//           ))}

//           {selectedShelter && selectedShelter.position && (
//             <InfoWindow
//               position={selectedShelter.position}
//               onCloseClick={() => setSelectedShelter(null)}
//             >
//               <div className="p-1 bg-white rounded sh-8 px-5 z-20">
//                 <div className="flex justify-center">
//                   <h2 className="text-lg font-semibold mb-2 border-b-2 border-black">
//                     {selectedShelter.name}
//                   </h2>
//                 </div>

//                 <div className="mb-4 flex justify-evenly md:p-2">
//                   <div>
//                     <span className="text-black text-xs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
//                       Food:{" "}
//                     </span>
//                     <span className="text-[#02a000] text-xxxs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
//                       {selectedShelter.food} days
//                       <br />
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-black text-xs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
//                       Water:{" "}
//                     </span>
//                     <span className="text-[#03a100] text-xxxs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
//                       {selectedShelter.water} days
//                       <br />
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-black text-xs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
//                       Meds:{" "}
//                     </span>
//                     <span className="text-[#03a100] text-xxxs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
//                       {selectedShelter.meds} days
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex justify-center pb-5">
//                   <button
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     onClick={handleDirectionClick}
//                   >
//                     Show Directions
//                   </button>
//                 </div>
//                 <p className="text-xxxs md:text-sm text-gray-300 mb-4 justify-center items-center">
//                   *You are about to be redirected to a new page with directions
//                   to this shelter. The shelter count will decrease.
//                 </p>
//               </div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default FloodMapComponent;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import ShelterDetails from "./ShelterDetails";
import ShelterForm from "./ShelterForm";
import { useShelters } from "@/context/ShelterContext";
import { FaDirections } from "react-icons/fa";
import { getFirestore, doc, deleteDoc } from "firebase/firestore"; // Import Firestore functions

const containerStyle = {
  width: "100%",
  height: "100%",
};

const labelStyles = {
  textAlign: "end",
  fontSize: "16px",
  fontWeight: "600",
  color: "#333",
};

const center = {
  lat: 11.250761,
  lng: 75.781807,
};

const FloodMapComponent = () => {
  const router = useRouter();
  const { shelters, setShelters } = useShelters();
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [icon, setIcon] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMarkerClick = (shelter) => {
    setSelectedShelter(shelter);
  };

  const handleDirectionClick = () => {
    if (selectedShelter && userLocation) {
      const destination = `${selectedShelter.position.lat},${selectedShelter.position.lng}`;

      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destination}`;
      window.open(directionsUrl, "_blank");

      // setShelters((prevShelters) =>
      //   prevShelters.map((shelter) =>
      //     shelter.id === selectedShelter.id
      //       ? { ...shelter, accommodationLeft: shelter.accommodationLeft - 1 }
      //       : shelter
      //   )
      // );
      // alert(
      //   `Accommodation in ${selectedShelter.name} has reduced to ${
      //     selectedShelter.accommodationLeft - 1
      //   }`
      // );
      setSelectedShelter(null);
    }
  };

  const onLoad = (map) => {
    const iconSize = new window.google.maps.Size(40, 40);
    setIcon({
      url: "/shelter.png",
      scaledSize: iconSize,
    });
  };

  const handleAddShelterClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDeleteShelter = async (id, name) => {
    const db = getFirestore(); // Initialize Firestore
    const shelterDocRef = doc(db, "Availability", name); // Reference to the document

    try {
      await deleteDoc(shelterDocRef); // Delete the document from Firestore
      setShelters((prevShelters) =>
        prevShelters.filter((shelter) => shelter.id !== id)
      );
      alert(`Shelter ${name} has been deleted successfully.`);
    } catch (error) {
      console.error("Error deleting shelter:", error);
      alert("Failed to delete the shelter. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-x-2 justify-center w-full">
      <div className="w-full col-span-1 md:col-span-2">
        <div className="w-full h-full max-h-[400px] md:max-h-[530px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
          <div className="w-full flex justify-center items-center text-black text-lg font-bold font-['Radio Canada'] tracking-wide">
            <div>Shelter Availability</div>
          </div>
          <div className="w-full h-[0px] border border-black m-1"></div>
          <div className="w-full h-full p-[2%] overflow-y-auto">
            {shelters.map((shelter) => (
              <ShelterDetails
                key={shelter.id}
                {...shelter}
                onDelete={() => handleDeleteShelter(shelter.id, shelter.name)} // Pass the handler down
                onSelect={() => setSelectedShelter(shelter)} // Pass the handler down
              />
            ))}
          </div>
          {showForm && <ShelterForm onClose={handleCloseForm} />}
          <div className="flex justify-end">
            <button
              className="flex justify-center items-center w-14 h-14 rounded-full text-white border-[#4255e0] border-2 focus:outline-none bg-[#4255e0] hover:bg-white hover:text-[#4255e0] hover:scale-105"
              onClick={handleAddShelterClick}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v12M6 12h12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full col-span-1 md:col-span-3">
        <div className="w-full h-[400px] md:h-full border-2 border-black rounded-md p-2">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            onLoad={onLoad}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
            >
              {shelters.map((shelter) => (
                <Marker
                  key={shelter.id}
                  position={shelter.position}
                  icon={icon}
                  label={{
                    ...labelStyles,
                  }}
                  className="w-10"
                  onClick={() => handleMarkerClick(shelter)}
                />
              ))}

              {selectedShelter && selectedShelter.position && (
                <InfoWindow
                  position={selectedShelter.position}
                  onCloseClick={() => setSelectedShelter(null)}
                >
                  <div className="p-1 bg-white rounded sh-8 px-5 z-20">
                    <div className="flex justify-center">
                      <h2 className="text-lg font-semibold mb-2 border-b-2 border-black">
                        {selectedShelter.name}
                      </h2>
                    </div>

                    <div className="mb-4 flex justify-evenly md:p-2">
                      <div>
                        <span className="text-black text-xs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
                          Food:{" "}
                        </span>
                        <span className="text-[#02a000] text-xxxs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
                          {selectedShelter.food} days
                          <br />
                        </span>
                      </div>
                      <div>
                        <span className="text-black text-xs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
                          Water:{" "}
                        </span>
                        <span className="text-[#03a100] text-xxxs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
                          {selectedShelter.water} days
                          <br />
                        </span>
                      </div>
                      <div>
                        <span className="text-black text-xs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
                          Meds:{" "}
                        </span>
                        <span className="text-[#03a100] text-xxxs md:text-xs font-semibold font-['Radio Canada'] tracking-wide">
                          {selectedShelter.meds} days
                        </span>
                      </div>
                    </div>
                    {/* <div className="flex justify-center pb-5">
                      <button
                        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600 flex transition duration-300 ease-in-out"
                        onClick={handleDirectionClick}
                      >
                        Get Directions <FaDirections className="ml-2 mt-1" />
                      </button>
                    </div> */}
                    <div className="flex justify-center pb-5">
                      <button
                        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600 flex transition duration-300 ease-in-out"
                        onClick={handleDirectionClick}
                      >
                        Get Directions
                        <FaDirections className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                    <p className="text-xxxs md:text-sm text-gray-300 mb-4 justify-center items-center">
                      *You are about to be redirected to a new page with
                      directions to this shelter. The shelter count will
                      decrease.
                    </p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default FloodMapComponent;
