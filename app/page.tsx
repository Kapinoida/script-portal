import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Home() {
  return (
    <main className="flex flex-col gap-36 flex-1 overflow-y-scroll p-4">
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
