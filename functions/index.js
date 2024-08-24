const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

exports.onFireDetectionChange = functions.firestore
  .document('fire_detection/1')
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();

    // Check if fire_ever_detected changed from false to true
    if (beforeData.fire_ever_detected === false && afterData.fire_ever_detected === true) {
      try {
        const response = await fetch("http://localhost:3000/api/makeCall", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Call made successfully");
      } catch (error) {
        console.error("Error making call:", error);
      }
    }
  });
