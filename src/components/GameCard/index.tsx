import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowCircle } from "react-icons/bi"

interface GameCardProps {
    data: GameProps;
}


export function GameCard({ data }: GameCardProps) {
    return (
        <Link href={`/game/${data.id}`}>
            <div className="w-full">
                <div className="relative h-56 w-full hover:scale-105 duration-300 transition-all">
                    <Image
                        src={data.image_url}
                        alt={data.title}
                        quality={100}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                        className="rounded-lg object-cover"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-white truncate">{data.title}</p>
                    <BiRightArrowCircle size={24} color="#fff" />
                </div>
            </div>
        </Link>
    )
}