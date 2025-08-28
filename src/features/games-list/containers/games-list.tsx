import { getIdleGames } from '@/features/game/server'
import GameCard from '../view/game-card'
import { Layout } from '../view/layout'
import { CreateButton } from './create-button'

export async function GamesList() {
	const games = await getIdleGames()

	return (
		<Layout actions={<CreateButton />}>
			{games.map(game => (
				<GameCard
					key={game.id}
					login={game.creator.login}
					rating={game.creator.rating}
				/>
			))}
		</Layout>
	)
}
