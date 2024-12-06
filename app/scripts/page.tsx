"use client";

import ScriptSelect from "@/components/script-select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Oxygen_Mono } from "next/font/google";

const oxygenMono = Oxygen_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Scripts() {
  const [result, setResult] = useState("");
  const [selectedScriptPath, setSelectedScriptPath] = useState<
    string | undefined
  >(undefined);
  const [selectedScriptId, setSelectedScriptId] = useState<number | undefined>(
    undefined
  );
  const [isRunning, setIsRunning] = useState(false);

  const handleScriptSelect = (scriptPath: string, key: number) => {
    setSelectedScriptId(key);
    setSelectedScriptPath(scriptPath);
  };

  const handleExportResults = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "results.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearResults = () => {
    setResult("");
  };

  const handleSubmit = async () => {
    if (!selectedScriptPath) {
      setResult("Please select a script first.");
      return;
    }

    setIsRunning(true);

    const userInput = "userInput";

    const startTime = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      const response = await fetch("/api/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startTime,
          scriptName: selectedScriptPath,
          userInput,
          scriptId: selectedScriptId,
          result: result || null,
        }),
      });

      if (response.ok) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        setResult("");

        const readChunk = async () => {
          const { done, value } = await reader!.read();
          console.log(done);
          if (done) {
            setIsRunning(false);

            await new Promise((resolve) => {
              setResult((prevResult) => {
                const newResult = prevResult + decoder.decode(value);
                resolve(newResult);
                return newResult;
              });
            }).then(async (newResult) => {
              const logResponse = await fetch("/api/write-log", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  startTime: startTime || null,
                  scriptId: selectedScriptId || null,
                  logLevel: "INFO",
                  message: "Script ran successfully",
                  result: newResult || null,
                }),
              });

              if (!logResponse.ok) {
                // Make this a toast
                console.error("Error writing log:", await logResponse.text());
              }
            });
            return;
          }
          const chunk = decoder.decode(value);
          setResult((prevResult) => prevResult + chunk);
          readChunk();
        };

        readChunk();
      } else {
        const data = await response.json();
        setResult(data.error);
      }
    } catch (error) {
      console.error(error);
      setResult("Network error");
    }
  };

  return (
    <div className="flex flex-1 gap-4 p-4 h-full">
      <div className="flex flex-col gap-4 items-center min-w-60">
        <h1 className="text-3xl font-bold">Scripts</h1>
        <ScriptSelect onScriptSelect={handleScriptSelect} />
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!selectedScriptPath || isRunning}
        >
          {isRunning ? "Running..." : "Run Script"}
        </Button>
        <Button
          className="w-full"
          onClick={handleClearResults}
          disabled={!result}
        >
          Clear Results
        </Button>
        <Button
          className="w-full"
          onClick={handleExportResults}
          disabled={!result}
        >
          Export Results
        </Button>
      </div>

      <code
        className={`p-4 flex flex-col flex-1 justify-start items-start bg-muted rounded-lg ${oxygenMono.className} min-h- overflow-y-auto`}
      >
        {result.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </code>
    </div>
  );
}
