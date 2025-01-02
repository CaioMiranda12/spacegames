import Link from "next/link";

import { FaRegCircleUser } from "react-icons/fa6";


export function Header(){
    return (
        <header className="w-full h-28 text-white px-2 bg-[#1C1C28]">
            <div className="max-w-screen-xl mx-auto flex justify-center sm:justify-between items-center h-28 ">
                <nav className="flex items-center justify-center gap-6">
                    <Link href='/'>
                        <h1 className="font-bold text-3xl">Space<span className="text-orange-500">Games</span></h1>
                    </Link>

                    <Link href='/' className="hover:text-orange-400 duration-200 transition-all">
                        Jogos
                    </Link>

                    <Link href='/profile' className="hover:text-orange-400 duration-200 transition-all">
                        Perfil
                    </Link>
                </nav>

                <div className="hidden sm:flex">
                    <Link href='/profile'>
                        <FaRegCircleUser size={26} color="#f97316" />
                    </Link>
                </div>
            </div>
        </header>
    )
}