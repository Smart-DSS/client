// /app/dashboard/_components/CrowdMapComponent.jsx

"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  HeatmapLayer,
} from "@react-google-maps/api";
// import { get, getDatabase, ref } from "firebase/database";
// import { app } from "@/config/FirebaseConfig";
import { cam_latLong } from "@/app/_components/cam_latLong";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// const center = {
//   lat: 11.250503,
//   lng: 75.781672,
// };
const center = {
  lat: 11.322887,
  lng: 75.936374,
};

const CrowdMapComponent = () => {
  const [latLongPoints, setLatLongPoints] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);
  const mapRef = useRef(null);

  // const db = getDatabase(app);

  // const getLatLong = () => {
  //   const dbRef = ref(db, "/data");
  //   get(dbRef)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         console.log("latLongPoints: ", data);
  //         setLatLongPoints(data);
  //         setHeatMapData(data.map((point) => new google.maps.LatLng(point[0], point[1])));
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleOnLoad = (map) => {
    mapRef.current = map;

    // Define custom marker icon
    const icon = {
      url: "/leaf-green.png",
      scaledSize: new window.google.maps.Size(40, 40),
    };

    // Function to add markers for all coordinates in cam_latLong
    const addMarkers = (coordinates) => {
      coordinates.forEach((coord) => {
        // const videoPopupContent = `
        //   <div style="width: 50vw; height: 50vh; display: flex; justify-content: center;">
        //     <div>
        //       <div>
        //         Coordinates: ${coord}
        //       </div>
        //       <video width="100%" height="100%" controls autoplay loop>
        //         <source src="your-video-url.mp4" type="video/mp4">
        //         Your browser does not support the video tag.
        //       </video>
        //     </div>
        //   </div>
        // `;
        const videoPopupContent = `
          <div style="width: 10vw; height: 10vh; display: flex; justify-content: center;">
            <div>
              <div>
                Coordinates: ${coord}
              </div>
            </div>
          </div>
        `;

        const marker = new window.google.maps.Marker({
          position: { lat: coord[0], lng: coord[1] },
          map,
          icon,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: videoPopupContent,
        });

        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
      });
    };

    // Call the function with cam_latLong
    addMarkers(cam_latLong);

    // Add custom control to go back to origin
    if (!mapRef.current.controls[window.google.maps.ControlPosition.LEFT_TOP].length) {
      const goToOriginControlDiv = document.createElement("div");
      const goToOriginControl = new GoToOriginControl(goToOriginControlDiv, map, center);

      goToOriginControlDiv.index = 1;
      // map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(goToOriginControlDiv);    // ORIGIN
    }
  };

  function GoToOriginControl(controlDiv, map, center) {
    const controlUI = document.createElement("button");
    controlUI.style.backgroundColor = "white";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "8px";
    controlUI.style.marginRight = "10px";
    controlUI.style.padding = "0 12px";
    controlUI.style.height = "30px";
    controlUI.innerHTML = "Go to Origin";
    controlDiv.appendChild(controlUI);

    controlUI.addEventListener("click", () => {
      map.setCenter(center);
      map.setZoom(18);
    });
  }

  // useEffect(() => {
  //   getLatLong();
  // }, []);

  return (
    <div className="relative w-full h-[300px] border-2 border-black rounded-md pt-2 pl-2">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={["visualization"]}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          onLoad={handleOnLoad}
        >
          {/* {heatMapData.length > 0 && (
            <HeatmapLayer
              data={heatMapData}
              options={{
                radius: 20,
                opacity: 0.6,
              }}
            />
          )} */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CrowdMapComponent;
