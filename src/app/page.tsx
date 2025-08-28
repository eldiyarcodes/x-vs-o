import { GamesList } from '@/features/games-list'

export default async function Home() {
	return (
		<div className='flex flex-col gap-8 max-w-[1200px] mx-auto pt-[100px]'>
			<h1 className='text-4xl font-bold'>Игры</h1>
			<GamesList />
		</div>
	)
}
