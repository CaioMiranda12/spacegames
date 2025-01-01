import { Container, GameCard, Input } from '@/components'
import Image from 'next/image';
import Link from 'next/link';

import { GameProps } from '@/utils/types/game';

export async function getDailyGames(){
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`)
    return res.json()
  } catch (err) {
    throw new Error('Failed to fetch data')
  }
}

export async function getGamesData(){
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`)
    return res.json()
  } catch(err){
    throw new Error('Failed to fetch data')
  }
}

export default async function Home() {
  const spaceGame: GameProps = await getDailyGames();
  const games: GameProps[] = await getGamesData()

  return (
    <main className='w-full'>
      <Container>
        <h1 className='text-orange-400 font-bold text-lg mt-8 mb-5'>Separamos um jogo exclusivo para você</h1>

        <Link href={`/game/${spaceGame.id}`}>
          <section className='w-full h-96 rounded-lg'>
            <div className='relative w-full h-96 max-h-96 rounded-lg'>
              <div className='absolute z-20 bottom-0 left-0 p-4 flex justify-center items-center gap-3'>
                <p className='text-white font-bold text-lg'>{spaceGame.title}</p>
                <button className='text-white bg-orange-500 px-3 py-1 rounded-xl hover:scale-110 transition-all duration-300'>Ver detalhes</button>
              </div>

              <div>
                <Image
                  src={spaceGame.image_url}
                  alt={spaceGame.title}
                  quality={100}
                  fill={true}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 44vw'
                  className='max-h-96 sm:object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300'
                />
              </div>
            </div>
          </section>
        </Link>

        <Input />

        <h2 className='mt-8 mb-5 text-white text-lg font-bold'>Jogos para conhecer</h2>
        <section className='grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {
            games && games.map(item => (
              <GameCard data={item} key={item.id} />
            ))
          }
        </section>
      </Container>
    </main>
  );
}
