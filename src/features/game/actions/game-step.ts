'use server'

import { stepGame } from '@/entities/game/server'
import { getCurrentUser } from '@/entities/user/server'
import { GameId } from '@/kernel/ids'
import { left } from '@/shared/lib/either'
import { gameEvents } from '../services/game-event'

export const gameStepAction = async ({
	idx,
	gameId,
}: {
	gameId: GameId
	idx: number
}) => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return left('not-found')
	}

	const result = await stepGame(gameId, currentUser, idx)

	if (result.type === 'right') {
		gameEvents.emit(result.value)
		return result
	}

	return result
}
