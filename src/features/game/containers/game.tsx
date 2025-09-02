import { GameId } from '@/kernel/ids'
import { GameClient } from './game-client'

export function Game({ gameId }: { gameId: GameId }) {
	return <GameClient gameId={gameId} />
}
