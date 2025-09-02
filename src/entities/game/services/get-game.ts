import { GameId } from '@/kernel/ids'
import { gameRepository } from '../repositories/game-repository'

export async function getGameById(gameId: GameId) {
	return gameRepository.getGame({ id: gameId })
}
