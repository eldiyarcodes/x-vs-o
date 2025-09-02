'use client'

import { GameId } from '@/kernel/ids'
import { useGame } from '../model/use-game'
import { GameField } from '../view/field'
import { GameLayout } from '../view/layout'
import { GamePlayers } from '../view/players'
import { GameStatus } from '../view/status'

export function Game({ gameId }: { gameId: GameId }) {
	const { game, isPending } = useGame(gameId)

	if (!game || isPending) {
		return <GameLayout status={'LOADING...'} />
	}

	return (
		<GameLayout
			players={<GamePlayers game={game} />}
			status={<GameStatus game={game} />}
			field={<GameField game={game} />}
		/>
	)
}
