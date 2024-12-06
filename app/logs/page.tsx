"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Oxygen_Mono } from "next/font/google";

const oxygenMono = Oxygen_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Logs() {
  const [logs, setLogs] = useState<
    {
      log_id: number;
      script_id: number;
      script_name: string;
      start_time: string;
      end_time: string;
      message: string;
      log_level: string;
      result: string;
    }[]
  >([]);

  const formatTimestamp = (timestampString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "America/Chicago",
    };
    const timestamp = new Date(timestampString);
    return timestamp.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetch-logs");
        const data = await response.json();

        if (response.ok) {
          setLogs(data);
        } else {
          console.error("Error fetching data:", data.error);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-4">Logs</h1>
      <Table>
        {/* <TableCaption>Logs</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Script Name</TableHead>
            <TableHead>Log Level</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.log_id}>
              <TableCell>{log.script_name}</TableCell>
              <TableCell>{log.log_level}</TableCell>
              <TableCell>{formatTimestamp(log.start_time)}</TableCell>
              <TableCell>{formatTimestamp(log.end_time)}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>Result</Button>
                  </SheetTrigger>
                  <SheetContent className="flex flex-col gap-4 min-w-[33%]">
                    <SheetHeader className="font-bold text-xl">
                      <SheetTitle>Result for {log.script_name}</SheetTitle>
                    </SheetHeader>
                    <SheetDescription>
                      {log.message} from {formatTimestamp(log.start_time)} to{" "}
                      {formatTimestamp(log.end_time)}
                    </SheetDescription>
                    <code
                      className={`p-4 flex flex-col flex-1 justify-start items-start bg-muted rounded-lg ${oxygenMono.className} overflow-y-auto`}
                    >
                      {log.result
                        ? log.result
                            .split("\n")
                            .map((line, index) => <p key={index}>{line}</p>)
                        : "No result available."}
                    </code>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>

            // <div key={log.log_id}>
            //   <h2>{log.script_name}</h2>
            //   {/* ... display script details */}
            // </div>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
