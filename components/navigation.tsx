'use client'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import Link from 'next/link'; // Import the Link component
import { usePathname } from "next/navigation"

export default function Navigation() {
    const pathname = usePathname();

    return (
        <div className="flex p-4 shadow-[#00357a] shadow-md min-w-28 justify-center items-start">
            <NavigationMenu>
                <NavigationMenuList className="flex flex-col gap-4">
                    <NavigationMenuItem>
                        <Link href="/scripts" className={pathname === "/scripts" ? "font-bold" : ""}>
                            Scripts 
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href="/logs" className={pathname === "/logs" ? "font-bold" : ""}>
                            Logs
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
