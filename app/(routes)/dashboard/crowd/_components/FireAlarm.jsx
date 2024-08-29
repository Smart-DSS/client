import { app } from "@/config/FirebaseConfig";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const FireAlarm = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [alertState, setAlertState] = useState(null);
  const [fireDetected, setFireDetected] = useState(null);
  const [fireEverDetected, setFireEverDetected] = useState(null); 
  const [latestImageUrl, setLatestImageUrl] = useState(null);
  const [highestConfidenceImageUrl, setHighestConfidenceImageUrl] =
    useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  const handleFalseAlarm = async () => {
    setAlertState("false");

    const docRef = doc(db, "fire_detection", "1");
    try {
      await updateDoc(docRef, {
        fire_detected: false,
        fire_ever_detected: false,
      });
      console.log("fire_detected and fire_ever_detected set to false");
    } catch (error) {
      console.error(
        "Error updating fire_detected and fire_ever_detected:",
        error
      );
    }

    const highestConfidenceImageRef = ref(storage, "highest_confidence_1.jpg");
    try {
      await deleteObject(highestConfidenceImageRef);
      console.log("highest_confidence_1.jpg deleted successfully");
    } catch (error) {
      console.error("Error deleting highest_confidence_1.jpg:", error);
    }
  };

  const makeCall = async () => {
    try {
      const response = await fetch("/api/makeCall", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("call made");
    } catch (error) {
      console.error("Error making call:", error);
    }
  };

  const handleAlert = () => {
    setAlertState("alert");
    makeCall();
  };

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(null);
  };

  useEffect(() => {
    const docRef = doc(db, "fire_detection", "1");

    const unsubscribe = onSnapshot(docRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setFireDetected(data.fire_detected);
        setFireEverDetected(data.fire_ever_detected);
        setTimestamp(data.timestamp);

        if (data.fire_detected && !data.fire_ever_detected) {
          await updateDoc(docRef, { fire_ever_detected: true });
        }

        const latestImageRef = ref(storage, data.latest_image_url);
        const highestConfidenceImageRef = ref(
          storage,
          data.highest_confidence_image_url
        );

        try {
          const latestImageURL = await getDownloadURL(latestImageRef);
          setLatestImageUrl(latestImageURL);

          const highestConfidenceImageURL = await getDownloadURL(
            highestConfidenceImageRef
          );
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
      <div className="w-full h-full flex justify-center items-center bg-[#ddd] text-black text-2xl font-['Radio Canada'] tracking-wide m-2 p-2 rounded-lg">
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
                  <>
                    <img
                      src={latestImageUrl}
                      alt="Latest Image"
                      className="w-full h-auto rounded-lg cursor-pointer"
                      onClick={() => openModal(latestImageUrl)}
                    />
                    <div className="flex justify-between p-2">
                      <div className="text-black text-xs font-light font-['Inter'] leading-[18px]">
                        Latest Image
                      </div>
                      <a
                        href={latestImageUrl}
                        download
                        className="text-blue-500 text-xs"
                      >
                        Download
                      </a>
                    </div>
                  </>
                ) : (
                  <div>Loading image...</div>
                )}
              </div>
              <div className="w-1/2">
                {highestConfidenceImageUrl ? (
                  <>
                    <img
                      src={highestConfidenceImageUrl}
                      alt="Highest Confidence Image"
                      className="w-full h-auto rounded-lg cursor-pointer"
                      onClick={() => openModal(highestConfidenceImageUrl)}
                    />
                    <div className="flex justify-between p-2">
                      <div className="text-black text-xs font-light font-['Inter'] leading-[18px]">
                        Highest Confidence Img
                      </div>
                      <a
                        href={highestConfidenceImageUrl}
                        download
                        className="text-blue-500 text-xs"
                      >
                        Download
                      </a>
                    </div>
                  </>
                ) : (
                  <div>Loading image...</div>
                )}
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
          The fire department and ambulance have been alerted and are on their way.
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="w-full h-full flex justify-center items-center bg-black bg-opacity-75 p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="w-full h-full flex justify-center items-center">
          <img
            src={modalImageUrl}
            alt="Full Screen View"
            className="w-auto h-auto max-w-full max-h-full"
          />
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FireAlarm;
