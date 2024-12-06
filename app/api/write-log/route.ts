"use server";

import { query } from "@/lib/db";

export async function POST(req: Request) {
  const { startTime, scriptId, logLevel, message, result } = await req.json();
  try {
    console.log(!result ? "No result" : "Result");

    if (!scriptId || !startTime) {
      return new Response("Missing required fields", { status: 400 });
    }
    await query(
      "INSERT INTO logs (script_id, start_time, log_level, message, result) VALUES (?, ?, ?, ?, ?)",
      [scriptId, startTime, logLevel, message, result]
    );
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error writing log:", error);
    return new Response("Error writing log", { status: 500 });
  }
}
