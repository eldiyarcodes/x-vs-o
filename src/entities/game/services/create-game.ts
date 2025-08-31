import { left, right } from '@/shared/lib/either'
import cuid from 'cuid'
import { PlayerEntity } from '../domain'
import { gameRepository } from '../repositories/game-repository'

export async function createGame(player: PlayerEntity) {
	const playerGames = await gameRepository.gameList({
		players: { some: { id: player.id } },
		status: 'idle',
	})

	if (
		playerGames.some(g => g.status === 'idle' && g.creator.id === player.id)
	) {
		return left('You already have an idle game' as const)
	}

	const createdGame = await gameRepository.createGame({
		id: cuid(),
		status: 'idle',
		creator: player,
	})

	return right(createdGame)
}
