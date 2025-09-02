import { GamesList } from '@/features/games-list'

export default function Home() {
	return (
		<div className='flex flex-col gap-8 pt-[100px] max-w-[1200px] w-full mx-auto max-[1260px]:px-10'>
			<h1 className='text-4xl font-bold'>Игры</h1>

			<GamesList />
		</div>
	)
}
