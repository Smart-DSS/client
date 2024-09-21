// import prisma from "@/lib/prisma";

// export async function GET(req) {
//   try {
//     const crowdData = await prisma.$queryRaw`
//       SELECT camera_id, person_count, timestamp
//       FROM real_time_data
//       WHERE (camera_id, timestamp) IN (
//         SELECT camera_id, MAX(timestamp)
//         FROM real_time_data
//         GROUP BY camera_id
//       )
//       ORDER BY camera_id;
//     `;

//     console.log("Crowd Data:", crowdData); // Log the retrieved data

//     return new Response(JSON.stringify(crowdData), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error); // Log any errors
//     return new Response("Error fetching data", { status: 500 });
//   }
// }

// import prisma from "@/lib/prisma";

// export async function GET(req) {
//   try {
//     const firstEntryPersonCount = await prisma.$queryRaw`
//       SELECT person_count
//       FROM real_time_data
//       ORDER BY timestamp ASC
//       LIMIT 1;
//     `;

//     console.log("First Entry Person Count:", firstEntryPersonCount); // Log the retrieved data

//     return new Response(JSON.stringify(firstEntryPersonCount), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error); // Log any errors
//     return new Response("Error fetching data", { status: 500 });
//   }
// }

// import pool from "@/lib/db";
// export default async function handler(req, res) {
//     try {
//         const result = await pool.query('SELECT * FROM real_time_data');
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('Error executing query', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }


// // app/api/crowd-data/route.js
// import { query } from "@/lib/db";

// export async function GET(request) {
//   const { rows } = await query('SELECT * FROM real_time_data');
//   // const { rows } = await query(
//   //   "SELECT camera_id, person_count, timestamp FROM real_time_data WHERE (camera_id, timestamp) IN ( SELECT camera_id, MAX(timestamp) FROM real_time_data GROUP BY camera_id) ORDER BY camera_id;"
//   // );
//   return new Response(JSON.stringify(rows), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }


// import dayjs from "dayjs";
// import { query } from "@/lib/db";

// export async function GET(request) {
//   const { rows } = await query('SELECT * FROM real_time_data');
  
//   // Format the timestamp
//   const formattedRows = rows.map(row => ({
//     ...row,
//     timestamp: dayjs(row.timestamp).format('YYYY-MM-DD HH:mm:ss')
//   }));

//   return new Response(JSON.stringify(formattedRows), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }
