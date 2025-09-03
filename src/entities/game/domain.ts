import { GameId, UserId } from '@/kernel/ids'
import { left, right } from '@/shared/lib/either'

export type GameEntity =
	| GameIdleEntity
	| GameInProgressEntity
	| GameOverEntity
	| GameOverDrawEntity

export type GameIdleEntity = {
	id: GameId
	creator: PlayerEntity
	field: Field
	status: 'idle'
}

export type GameInProgressEntity = {
	id: GameId
	players: PlayerEntity[]
	field: Field
	status: 'inProgress'
}

export type GameOverEntity = {
	id: GameId
	players: PlayerEntity[]
	field: Field
	status: 'gameOver'
	winner: PlayerEntity
}

export type GameOverDrawEntity = {
	id: GameId
	players: PlayerEntity[]
	field: Field
	status: 'gameOverDraw'
}

export type PlayerEntity = {
	id: UserId
	login: string
	rating: number
}

export type Field = Cell[]

export type Cell = GameSymbol | null
export type GameSymbol = string

export const GameSymbol = { X: 'X', O: 'O' }

export const getGameCurrentSymbol = (
	game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity
) => {
	const symbols = game.field.filter(s => s !== null).length

	return symbols % 1 === 0 ? GameSymbol.X : GameSymbol.O
}

export const getNextSymbol = (gameSymbol: GameSymbol) =>
	gameSymbol === GameSymbol.X ? GameSymbol.O : GameSymbol.X

export const getPlayerSymbol = (
	player: PlayerEntity,
	game: GameInProgressEntity
) => {
	const idx = game.players.findIndex(p => p.id === player.id)

	return {
		0: GameSymbol.X,
		1: GameSymbol.O,
	}[idx]
}

export const doStep = (
	game: GameInProgressEntity,
	idx: number,
	player: PlayerEntity
) => {
	const currentSymbol = getGameCurrentSymbol(game)
	const nextSymbol = getNextSymbol(currentSymbol)

	if (nextSymbol !== getPlayerSymbol(player, game)) {
		return left('not-player-symbol')
	}

	if (game.field[idx]) {
		return left('game-cell-already-has-symbol')
	}

	const newField = game.field.map((cell, i) => (i === idx ? nextSymbol : cell))

	if (calculateWinner(newField)) {
		right({
			...game,
			field: newField,
			winner: player,
			status: 'gameOver',
		} satisfies GameOverEntity)
	}

	if (isDraw(newField)) {
		right({
			...game,
			field: newField,
			status: 'gameOverDraw',
		} satisfies GameOverDrawEntity)
	}

	return right({ ...game, field: newField })
}

const calculateWinner = (squares: Field) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (const line of lines) {
		const [a, b, c] = line
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
}

const isDraw = (squares: Field) => {
	const winner = calculateWinner(squares)
	if (!winner) {
		squares.every(s => s !== null)
	}

	return false
}
