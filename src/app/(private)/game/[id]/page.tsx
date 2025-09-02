import { Game } from '@/features/game/server'

export default async function GamePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<main className='flex flex-col grow max-w-[500px] w-full mx-auto pt-16'>
			<Game gameId={id} />
		</main>
	)
}
