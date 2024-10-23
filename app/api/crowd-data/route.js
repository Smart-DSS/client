import dayjs from "dayjs";
import { query } from "@/lib/db";

export async function GET(request) {
  const { rows } = await query('SELECT * FROM real_time_data');
  
  // Format the timestamp
  const formattedRows = rows.map(row => ({
    ...row,
    timestamp: dayjs(row.timestamp).format('YYYY-MM-DD HH:mm:ss')
  }));

  return new Response(JSON.stringify(formattedRows), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
