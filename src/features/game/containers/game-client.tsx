'use client'

import { GameDomain } from '@/entities/game'
import { useGame } from '../model/use-game'
import { GameField } from '../view/field'
import { GameLayout } from '../view/layout'
import { GamePlayers } from '../view/players'
import { GameStatus } from '../view/status'

export function GameClient({
	defaultGame,
}: {
	defaultGame: GameDomain.GameEntity
}) {
	const { game = defaultGame, step } = useGame(defaultGame.id)

	return (
		<GameLayout
			players={<GamePlayers game={game} />}
			status={<GameStatus game={game} />}
			field={<GameField game={game} onCellClick={step} />}
		/>
	)
}
