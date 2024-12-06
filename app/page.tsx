"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Home() {
  const [numLogs, setNumLogs] = useState(0);

  return (
    <main className="flex flex-col gap-36 flex-1 p-4">
      <div className="flex flex-wrap gap-4 justify-center min-h-48">
        <Card className="min-w-48 max-w-48">
          <CardHeader>
            <CardTitle>Total Scripts Ran</CardTitle>
          </CardHeader>
          <CardContent>Card Content</CardContent>
        </Card>
        <Card className="min-w-48 max-w-48">
          <CardHeader>
            <CardTitle>Scheduled Scripts</CardTitle>
          </CardHeader>
          <CardContent>Card Content</CardContent>
        </Card>
        <Card className="min-w-48 max-w-48">
          <CardHeader>
            <CardTitle>Errors Waiting</CardTitle>
          </CardHeader>
          <CardContent>Card Content</CardContent>
        </Card>
        <Card className="min-w-48 max-w-48">
          <CardHeader>
            <CardTitle>Total Run Time</CardTitle>
          </CardHeader>
          <CardContent>Card Content</CardContent>
        </Card>
      </div>

      <Switch />
      <h1>Hello</h1>
      <Input />
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
    </main>
  );
}
