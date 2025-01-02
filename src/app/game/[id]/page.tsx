import { Container, GameCard } from "@/components";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { Label } from "./components/label";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface PropParams {
    params: {
        id: string;
    }
}

export async function generateMetadata({ params}: PropParams): Promise<Metadata>{
    const { id } = await params;

    try {
        const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`)
        .then(res => res.json())
        .catch(() => {
            return {
                title: 'Space Games - Descubra jogos incríveis para se divertir'
            }
        })

        return {
            title: response.title,
            description: `${response.description.slice(0, 100)}...`,
            openGraph: {
                title: response.title,
                images: [response.image_url]
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: true,
                    noimageindex: true,
                }
            }
        }
    } catch(err){
        return {
            title: 'Space Games - Descubra jogos incríveis para se divertir'
        }
    }
    
}


export async function getGameData(id: string){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { next: { revalidate: 60}});
        return res.json();
    } catch(err){
        throw new Error('Failed to fetch data');
    }
}

export async function getRandomGame(){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: 'no-store'});
        return res.json();
    } catch (err) {
        throw new Error('Failed to fetch data');
    }
}


export default async function Game({
    params
}: {
    params: { id: string }
}){
    const { id } = await params;
    const game: GameProps = await getGameData(id);
    const randomGame: GameProps = await getRandomGame()

    if(!game){
        redirect('/')
    }

    return (
        <main className="w-full">
            <div className="relative w-full h-80 sm:h-96">
                <Image 
                    src={game.image_url}
                    alt={game.title}
                    quality={100}
                    fill={true}
                    priority={true}
                    className="h-80 sm:h-96 w-full object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                />
            </div>

            <Container>
                <h2 className="text-white font-bold text-xl mt-8 mb-5">{game.title}</h2>

                <p className="text-white text-base">
                    {game.description}
                </p>

                <h2 className="text-white font-bold text-lg mt-8 mb-5">Plataformas disponíveis:</h2>
                <section className="flex gap-4 flex-wrap">
                    {game && game.platforms.map(item => (
                        <Label name={item} key={item} />
                    ))}
                </section>

                <h2 className="text-white font-bold text-lg mt-8 mb-5">Categorias:</h2>
                <section className="flex gap-4 flex-wrap">
                    {game && game.categories.map(item => (
                        <Label name={item} key={item} />
                    ))}
                </section>

                <p className="text-white text-lg mt-8"><strong>Lançamento: </strong>{game.release}</p>

                <section className="mb-8">
                    <h2 className="text-white font-bold text-lg mt-8 mb-5">Outros jogos que recomendamos:</h2>
                    <div className="flex">
                        <div className="flex-grow">
                            <GameCard data={randomGame}/>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    )
}