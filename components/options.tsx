import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";



export default function Options() {
    return (
        <div className="flex gap-4">
            <ModeToggle />
            <Avatar>
                <AvatarFallback>DP</AvatarFallback>
            </Avatar>
        </div>
    )
}