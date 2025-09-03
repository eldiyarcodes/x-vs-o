import { GameId } from '@/kernel/ids'
import { prisma } from '@/shared/lib/db'
import { Game, GamePlayer, Prisma, User } from '@prisma/client'
import { z } from 'zod'
import {
	GameEntity,
	GameIdleEntity,
	GameInProgressEntity,
	GameOverDrawEntity,
	GameOverEntity,
	PlayerEntity,
} from '../domain'

const gameInclude = {
	players: { include: { user: true } },
	winner: { include: { user: true } },
}

async function gameList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
	const games = await prisma.game.findMany({
		where,
		include: gameInclude,
	})

	return games.map(dbGameToEntity)
}

async function startGame(gameId: GameId, player: PlayerEntity) {
	return dbGameToEntity(
		await prisma.game.update({
			where: { id: gameId },
			data: {
				players: {
					create: {
						index: 1,
						userId: player.id,
					},
				},
				status: 'inProgress',
			},
			include: gameInclude,
		})
	)
}

async function saveGame(
	game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity
) {
	const winnerId =
		game.status === 'gameOver'
			? await prisma.gamePlayer
					.findFirstOrThrow({ where: { userId: game.winner.id } })
					.then(p => p.id)
			: undefined

	return dbGameToEntity(
		await prisma.game.update({
			where: { id: game.id },
			data: {
				status: game.status,
				field: game.field,
				winnerId: winnerId,
			},
			include: gameInclude,
		})
	)
}

async function getGame(where?: Prisma.GameWhereInput) {
	const game = await prisma.game.findFirst({
		where,
		include: gameInclude,
	})

	if (game) return dbGameToEntity(game)

	return undefined
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
	const createdGame = await prisma.game.create({
		data: {
			status: game.status,
			id: game.id,
			players: {
				create: {
					index: 0,
					userId: game.creator.id,
				},
			},
			field: game.field,
		},
		include: gameInclude,
	})

	return dbGameToEntity(createdGame)
}

const fieldSchema = z.array(z.union([z.string(), z.null()]))

function dbGameToEntity(
	game: Game & {
		players: Array<GamePlayer & { user: User }>
		winner?: (GamePlayer & { user: User }) | null
	}
): GameEntity {
	const players = game.players
		.sort((a, b) => a.index - b.index)
		.map(dbPlayerToPlayer)

	switch (game.status) {
		case 'idle': {
			const [creator] = players
			if (!creator) {
				throw new Error('Game creator is missing')
			}

			return {
				id: game.id,
				creator,
				status: game.status,
				field: fieldSchema.parse(game.field),
			} satisfies GameIdleEntity
		}
		case 'inProgress':
		case 'gameOverDraw': {
			return {
				id: game.id,
				players,
				status: game.status,
				field: fieldSchema.parse(game.field),
			}
		}
		case 'gameOver': {
			if (!game.winner) {
				throw new Error('Game winner is missing')
			}

			return {
				id: game.id,
				players,
				status: game.status,
				field: fieldSchema.parse(game.field),
				winner: dbPlayerToPlayer(game.winner),
			} satisfies GameOverEntity
		}
	}
}

export const dbPlayerToPlayer = (
	db: GamePlayer & { user: User }
): PlayerEntity => {
	return {
		id: db.user.id,
		login: db.user.login,
		rating: db.user.rating,
	}
}

export const gameRepository = {
	gameList,
	createGame,
	getGame,
	startGame,
	saveGame,
}
