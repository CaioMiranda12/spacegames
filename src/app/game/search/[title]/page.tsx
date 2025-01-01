import { Container, GameCard, Input } from '@/components'
import { GameProps } from '@/utils/types/game';


export async function getData(title: string){
    try {
        const decodedTitle = decodeURI(title)

        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodedTitle}`);
        return res.json();
    } catch (err) {
        return null;
    }
}

export default async function Search({
    params
}: {
    params: { title: string }
}){
    const { title } = await params

    const games: GameProps[] = await getData(title)

    return (
        <main className="w-full">
            <Container>
                <Input />

                <h1 className='text-white font-bold text-lg'>Veja o que encontramos na nossa base...</h1>

                <section className='grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                   {games && games.map(item => (
                    <GameCard key={item.id} data={item} />
                   ))}

                   {!games && (
                    <h1 className='text-white font-bold text-xl mt-8'>Jogo não encontrado...</h1>
                   )}
                </section>
            </Container>
        </main>
    )
}