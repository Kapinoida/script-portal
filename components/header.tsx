import Link from "next/link";
import Options from "./options";
import Image from "next/image";


export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 shadow-[#00357a] shadow-sm z-20">
            <Link href="/">
                <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>
            
            <h1 className="text-3xl font-bold">EdTech Scripting Portal</h1>
            <Options />
        </header>
    )
}