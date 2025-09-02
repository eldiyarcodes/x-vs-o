import { GameId } from '@/kernel/ids'
import { left } from '@/shared/lib/either'
import { PlayerEntity } from '../domain'
import { gameRepository } from '../repositories/game-repository'

export async function startGame(gameId: GameId, player: PlayerEntity) {
	const game = await gameRepository.getGame({ id: gameId })

	if (!game) return left('game-not-found' as const)

	if (game.status !== 'idle') return left('game-status-not-idle' as const)

	if (game.creator.id === player.id)
		return left('creator-can-not-start-game' as const)

	gameRepository.startGame(gameId, player)
}
