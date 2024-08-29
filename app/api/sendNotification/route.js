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
