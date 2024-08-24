import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST() {
  try {
    // Predefined list of phone numbers
    // const phoneNumbers = ["+919400100423", "+919995384322"];
    const phoneNumbers = ["+919400100423"];

    // Create calls for each phone number
    const callPromises = phoneNumbers.map((number) =>
      client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: number,
        twiml: `<Response>
                  <Say>This is an emergency alert. Please be informed that there is a fire detected at National Institute of Technology, Calicut. Immediate action is required. Evacuate the area and follow safety protocols.</Say>
                  <Say>This is an emergency alert. Please be informed that there is a fire detected at National Institute of Technology, Calicut. Immediate action is required. Evacuate the area and follow safety protocols.</Say>
                </Response>`,
      })
    );

    // Wait for all calls to be completed
    const callResults = await Promise.all(callPromises);

    // Return response with call SIDs
    return NextResponse.json(
      { sids: callResults.map((call) => call.sid) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import twilio from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// export async function POST() {
//   try {
//     const call = await client.calls.create({
//       from: process.env.TWILIO_PHONE_NUMBER,
//       // Trial: $14.2372
//       // Trial: $14.1996
//       // Trial: $14.162
//       // to: "+919400100423",
//       // url: "http://demo.twilio.com/docs/voice.xml",
//       // url: "http://demo.twilio.com/docs/classic.mp3",  never gonna give u up
//       to: "+919400100423",
//       twiml:
//         "<Response><Say>Attention! This is an emergency alert. Please be informed that there is a fire detected at National Institute of Technology, Calicut. Immediate action is required. Evacuate the area and follow safety protocols. Emergency services have been notified. Please stay safe and await further instructions.</Say></Response>",
//     });

//     return NextResponse.json({ sid: call.sid }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
