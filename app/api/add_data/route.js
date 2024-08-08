// app/api/add_data/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
    const { camera_id, timestamp, track_id, latitude, longitude, velocity, person_count } = await request.json();

    // Process the received data here (e.g., store it in a database or handle it as needed)
    console.log("Received data:", { camera_id, timestamp, track_id, latitude, longitude, velocity, person_count });

    return NextResponse.json({ message: 'Data received successfully' }, { status: 201 });
}
