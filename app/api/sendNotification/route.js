// app/api/sendNotification/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { accessToken, message } = await request.json();

    const response = await fetch('https://fcm.googleapis.com/v1/projects/focus-flight-430011-b2/messages:send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        const error = await response.json();
        return NextResponse.json({ success: false, error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
}



// import { google } from 'google-auth-library';
// import fetch from 'node-fetch';
// import { join } from 'path';

// async function sendNotification() {
//     const serviceAccountKeyPath = join(__dirname, 'focus-flight-430011-b2-1fdb9a141529.json'); // Update the path
//     const client = new google.auth.GoogleAuth({
//         keyFile: serviceAccountKeyPath,
//         scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
//     });

//     const accessToken = await client.getAccessToken();

//     const message = {
//         message: {
//             token: "ckzjha6PT26KMrmz2iIMUi:APA91bGGqn7zHI7zqZi5Wu38oKL2li9YTh_c9h_qSTp5trn9QAf5g3lqRBRqW0uZLY5giVcgtCGITvFKh7ifiRwtnubjqs4L7_uB1qAlKULwJJ2EMrSymC7p4EvmsMTpNGi09UFcnVTd", // Replace with the actual token
//             notification: {
//                 title: "Nirnai Message",
//                 body: "This is an Alert notification message!"
//             }
//         }
//     };

//     const response = await fetch('https://fcm.googleapis.com/v1/projects/YOUR_PROJECT_ID/messages:send', { // Replace with your actual project ID
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(message),
//     });

//     if (!response.ok) {
//         const error = await response.json();
//         console.error('Error sending notification:', error);
//     } else {
//         const data = await response.json();
//         console.log('Notification sent successfully:', data);
//     }
// }

// sendNotification().catch(console.error);

// try3

// app/api/sendNotification/route.js

// import { NextResponse } from "next/server";
// import { GoogleAuth } from "google-auth-library";
// import fetch from "node-fetch";
// import { join } from "path";

// export async function POST(request) {
//   try {
//     const serviceAccountKeyPath = join(
//       process.cwd(),
//       "/focus-flight-430011-b2-1fdb9a141529.json"
//     ); // Update the path if needed
//     const googleAuth = new GoogleAuth({
//       keyFile: serviceAccountKeyPath,
//       scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
//     });

//     const client = await googleAuth.getClient();
//     const accessToken = await client.getAccessToken();

//     console.log("accessToken", accessToken);

//     const { token, title, body } = await request.json();

//     const message = {
//       message: {
//         token: token, // Replace with the actual token from the request
//         notification: {
//           title: title, // Use title from the request
//           body: body, // Use body from the request
//         },
//       },
//     };

//     const response = await fetch(
//       "https://fcm.googleapis.com/v1/projects/focus-flight-430011-b2/messages:send",
//       {
//         // Replace with your actual project ID
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       return NextResponse.json(
//         { success: false, error },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (error) {
//     console.error("Error sending notification:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }


// const admin = require('firebase-admin');
// const serviceAccount = require('path/to/your-service-account.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const message = {
//   notification: {
//     title: 'Test Title',
//     body: 'Test Body',
//   },
//   token: 'YOUR_FCM_TOKEN_HERE',
// };

// admin.messaging().send(message)
//   .then((response) => {
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });

