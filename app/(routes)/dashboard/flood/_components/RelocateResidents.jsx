import React, { useState } from "react";
import { getFirestore, collection, getDocs, query, where, updateDoc } from "firebase/firestore"; // Import Firestore functions

const RelocateResidents = () => {
  const [alertState, setAlertState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const db = getFirestore(); // Initialize Firestore

  const notifyResidents = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const residentsRef = collection(db, "Residents");
  
      // Create a query to select documents where isNotOnAlert is true
      const q = query(residentsRef, where("isNotOnAlert", "==", true));
  
      // Execute the query
      const querySnapshot = await getDocs(q);
  
      // Iterate through the results and update each document
      const promises = [];
      const notifications = [];
  
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
  
        // Update the document to set isNotOnAlert to false
        promises.push(updateDoc(docRef, { isNotOnAlert: false }));
  
        // Send push notification using FCM
        const data = doc.data();
        notifications.push(sendPushNotification(data.accessToken, data.fcmtoken));
      });
  
      // Wait for all updates to complete
      await Promise.all(promises);
  
      // Wait for all notifications to be sent
      await Promise.all(notifications);
  
      setAlertState("alert");
      console.log("Documents updated and notifications sent successfully");
  
    } catch (err) {
      console.error("Error notifying residents:", err);
      // setError("Failed to notify residents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const notifyResidents = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const residentsRef = collection(db, "Residents");

  //     // Create a query to select documents where isNotOnAlert is true
  //     const q = query(residentsRef, where("isNotOnAlert", "==", true));

  //     // Execute the query
  //     const querySnapshot = await getDocs(q);

  //     // Iterate through the results and update each document
  //     const promises = [];
  //     querySnapshot.forEach((doc) => {
  //       const docRef = doc.ref;
  //       promises.push(updateDoc(docRef, { isNotOnAlert: false }));
  //     });

  //     // Wait for all updates to complete
  //     await Promise.all(promises);

  //     res.status(200).json({ message: "Documents updated successfully" });
  //     // // FCM
  //     // // Fetch all documents from the Residents collection
  //     // const residentsCollection = collection(db, "Residents");
  //     // const residentsSnapshot = await getDocs(residentsCollection);

  //     // const notifications = residentsSnapshot.docs.map((doc) => {
  //     //   const data = doc.data();
  //     //   console.log(data.accessToken, data.fcmtoken);
  //     //   return sendPushNotification(data.accessToken, data.fcmtoken);
  //     // });

  //     // // Wait for all notifications to be sent
  //     // await Promise.all(notifications);

  //     // setAlertState("alert");
  //   } catch (err) {
  //     console.error("Error notifying residents:", err);
  //     setError("Failed to notify residents. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const sendPushNotification = async (accessToken, fcmtoken) => {
    try {
      const response = await fetch("/api/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          message: {
            token: fcmtoken,
            notification: {
              body: "This is an Alert notification message!",
              title: "Nirnai Alert",
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send notification");
      }

      const result = await response.json();
      console.log("Notification sent:", result);
    } catch (error) {
      console.error("Error sending push notification:", error);
      throw error; // Re-throw to handle in the main notifyResidents function
    }
  };

  return (
    <div className="w-full h-full max-h-[400px] md:max-h-[640px] flex flex-col mx-2 p-2 rounded-lg bg-white shadow-[4px_8px_15px_#00000040]">
      {alertState === null && (
        <>
          <div className="w-full flex justify-center items-center text-black text-lg font-['Radio Canada'] tracking-wide">
            <div>Relocate Residents:</div>
          </div>
          <div className="w-full h-[0px] border border-black m-1"></div>
          <div className="w-full h-full p-[2%] overflow-y-auto">
            {/* <div className="flex justify-end space-x-4 mt-4"> */}
            <div className="flex flex-col justify-center p-3 gap-4">
              <div className="font-extralight text-sm">
                To notify app users about relocating to their nearest assigned
                shelter, please click the button below.
              </div>
              <button
                onClick={notifyResidents}
                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                disabled={loading}
              >
                <span>
                  {loading ? (
                    "Notifying..."
                  ) : (
                    <div className="flex justify-center">
                      Notify Residents
                      <img
                        src="/send.png" // Update this path to the correct location of send.png
                        alt="Send"
                        className="w-7 h-7 mx-2" // Adjust size as needed
                      />
                    </div>
                  )}
                </span>
              </button>
            </div>
            {error && (
              <div className="mt-4 text-red-600 text-center">{error}</div>
            )}
          </div>
        </>
      )}
      {alertState === "alert" && (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#cd0000]/40 text-white text-lg font-['Radio Canada'] tracking-wide p-4 rounded-lg">
          <div className="text-center">
            All residents in that location have been notified to relocate.
          </div>
          <button
            onClick={() => setAlertState(null)}
            className="bg-white text-[#cd0000] hover:text-[#a00000] mt-4 py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default RelocateResidents;