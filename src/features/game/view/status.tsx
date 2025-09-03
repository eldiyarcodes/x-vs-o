import { GameDomain } from '@/entities/game'

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
	switch (game.status) {
		case 'idle':
			return <div className='text-lg'>Waiting player</div>
		case 'inProgress':
			return (
				<div className='text-lg'>
					Move: {GameDomain.getGameCurrentSymbol(game)}
				</div>
			)
		case 'gameOver':
			return (
				<div className='text-lg'>
					Winner: {GameDomain.getPlayerSymbol(game.winner, game)}
				</div>
			)
		case 'gameOverDraw':
			return <div className='text-lg'>Draw</div>
	}
}
