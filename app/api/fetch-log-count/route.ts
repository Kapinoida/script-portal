// app/api/fetch-log-count/route.ts
"use server";

import { query } from "@/lib/db"; // Adjust the path if your db.js is located elsewhere

export async function GET(req: Request) {
  try {
    // Example: Fetch all scripts from the 'scripts' table
    const results = await query("SELECT COUNT(*) FROM logs");

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching data from the database" }),
      { status: 500 }
    );
  }
}
