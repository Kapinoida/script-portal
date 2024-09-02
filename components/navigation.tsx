
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"

export default function Navigation() {
    return (
        <div className="p-4 shadow-[#00357a] shadow-md">
            <NavigationMenu>
                <NavigationMenuList className="flex flex-col gap-4">
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/scripts">Scripts</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/logs">Logs</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            
        </div>
    )
}