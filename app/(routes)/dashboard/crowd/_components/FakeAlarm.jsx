import { app } from "@/config/FirebaseConfig";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, deleteObject } from "firebase/storage";
import React, { useState, useEffect } from "react";

const FakeAlarm = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [alertState, setAlertState] = useState(null);
  const [fireDetected, setFireDetected] = useState(null);
  const [fireEverDetected, setFireEverDetected] = useState(null); // New state variable
  const [latestImageUrl, setLatestImageUrl] = useState(null);
  const [highestConfidenceImageUrl, setHighestConfidenceImageUrl] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  const handleFalseAlarm = async () => {
    setAlertState("false");

    // Update fire_detected and fire_ever_detected to false in Firestore
    const docRef = doc(db, "fire_detection", "1");
    try {
      await updateDoc(docRef, { fire_detected: false, fire_ever_detected: false });
      console.log("fire_detected and fire_ever_detected set to false");
    } catch (error) {
      console.error("Error updating fire_detected and fire_ever_detected:", error);
    }

    // Delete highest_confidence_1.jpg from Firebase Storage
    const highestConfidenceImageRef = ref(storage, "highest_confidence_1.jpg");
    try {
      await deleteObject(highestConfidenceImageRef);
      console.log("highest_confidence_1.jpg deleted successfully");
    } catch (error) {
      console.error("Error deleting highest_confidence_1.jpg:", error);
    }
  };

  const handleAlert = () => {
    setAlertState("alert");
  };

  useEffect(() => {
    const docRef = doc(db, "fire_detection", "1");

    const unsubscribe = onSnapshot(docRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setFireDetected(data.fire_detected);
        setFireEverDetected(data.fire_ever_detected); // Update fireEverDetected
        setTimestamp(data.timestamp);

        // If fire is detected, set fireEverDetected to true in Firestore
        if (data.fire_detected && !data.fire_ever_detected) {
          await updateDoc(docRef, { fire_ever_detected: true });
        }

        // Fetch URLs from Firebase Storage
        // const latestImageRef = ref(storage, process.env.NEXT_PUBLIC_LATEST_IMAGE_URL);
        // const highestConfidenceImageRef = ref(storage, process.env.NEXT_PUBLIC_HIGHEST_CONFIDENCE_IMAGE_URL);
        const latestImageRef = ref(storage, data.latest_image_url);
        const highestConfidenceImageRef = ref(storage, data.highest_confidence_image_url);

        try {
          const latestImageURL = await getDownloadURL(latestImageRef);
          setLatestImageUrl(latestImageURL);

          const highestConfidenceImageURL = await getDownloadURL(highestConfidenceImageRef);
          setHighestConfidenceImageUrl(highestConfidenceImageURL);
        } catch (error) {
          console.error("Error fetching image URLs:", error);
        }
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [db, storage]);

  const formatTimestamp = (timestamp) => {
    const year = timestamp.slice(0, 4);
    const month = timestamp.slice(4, 6);
    const day = timestamp.slice(6, 8);
    const hour = timestamp.slice(9, 11);
    const minute = timestamp.slice(11, 13);
    const second = timestamp.slice(13, 15);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  if (fireEverDetected === null) {
    return <div>Loading...</div>;
  }

  if (!fireEverDetected) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-[#ddd] text-black text-lg font-['Radio Canada'] tracking-wide p-4 rounded-lg">
        No potential hazard
      </div>
    );
  }

  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col m-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      {alertState === null && (
        <>
          <div className="w-full flex justify-center items-center text-black text-lg font-['Radio Canada'] tracking-wide">
            <div>Potential Reason: </div>
            <div className="font-bold">Fire</div>
          </div>
          <div className="w-full h-[0px] border border-black m-1"></div>
          <div className="w-full h-full p-[2%] overflow-y-auto">
            <div className="w-full flex justify-between space-x-4">
              <div className="w-1/2">
                {latestImageUrl ? (
                  <img
                    src={latestImageUrl}
                    alt="Latest Image"
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div>Loading image...</div>
                )}
                <div className="text-black text-xs font-light font-['Inter'] leading-[18px] p-2">
                  Latest Image
                </div>
              </div>
              <div className="w-1/2">
                {highestConfidenceImageUrl ? (
                  <img
                    src={highestConfidenceImageUrl}
                    alt="Highest Confidence Image"
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div>Loading image...</div>
                )}
                <div className="text-black text-xs font-light font-['Inter'] leading-[18px] p-2">
                  Highest Confidence Img
                </div>
              </div>
            </div>
            <div className="text-black text-xs font-extralight font-['Inter'] leading-[18px] mt-2">
              Last Updated: {formatTimestamp(timestamp)}
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleFalseAlarm}
                className="bg-[#4355de] hover:bg-[#2c3bbf] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                False Alarm
              </button>
              <button
                onClick={handleAlert}
                className="bg-[#cd0000] hover:bg-[#a00000] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Alert
              </button>
            </div>
          </div>
        </>
      )}
      {alertState === "false" && (
        <div className="w-full h-full flex justify-center items-center bg-[#4355de]/40 text-white text-lg font-['Radio Canada'] tracking-wide p-4 rounded-lg">
          The alert on this camera was dismissed due to a false alarm.
        </div>
      )}
      {alertState === "alert" && (
        <div className="w-full h-full flex justify-center items-center bg-[#cd0000]/40 text-white text-lg font-['Radio Canada'] tracking-wide p-4 rounded-lg">
          Local police units were informed about the anomaly. They will be
          reaching the spot as soon as possible.
        </div>
      )}
    </div>
  );
};

export default FakeAlarm;
