import { prisma } from '@/shared/lib/db'
import { Button } from '@/shared/ui/button'
import { Card, CardDescription, CardTitle } from '@/shared/ui/card'

export default async function Home() {
	const games = await prisma.game.findMany()

	return (
		<div className='max-w-[1200px] mx-auto mt-10'>
			<Button size={'lg'}>Next</Button>

			{games.map(game => (
				<Card key={game.id} className='mt-4 p-4'>
					<CardTitle>{game.name}</CardTitle>
					<CardDescription>Game ID: {game.id}</CardDescription>
				</Card>
			))}
		</div>
	)
}
