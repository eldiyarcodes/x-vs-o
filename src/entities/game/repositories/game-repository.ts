import { prisma } from '@/shared/lib/db'
import { removePassword } from '@/shared/lib/password'
import { Game, Prisma, User } from '@prisma/client'
import { z } from 'zod'
import {
	GameEntity,
	GameIdleEntity,
	GameOverEntity,
} from '../../../entities/game/domain'

async function gameList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
	const games = await prisma.game.findMany({
		where,
		include: {
			players: true,
			winner: true,
		},
	})

	return games.map(dbGameToEntity)
}

async function getGame(where?: Prisma.GameWhereInput) {
	const game = await prisma.game.findFirst({
		where,
		include: {
			players: true,
			winner: true,
		},
	})

	if (game) return dbGameToEntity(game)

	return undefined
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
	const createdGame = await prisma.game.create({
		data: {
			status: game.status,
			id: game.id,
			players: { connect: { id: game.creator.id } },
			field: game.field,
		},
		include: {
			players: true,
			winner: true,
		},
	})

	return dbGameToEntity(createdGame)
}

const fieldSchema = z.array(z.union([z.string(), z.null()]))

function dbGameToEntity(
	game: Game & { players: User[]; winner?: User | null }
): GameEntity {
	const players = game.players.map(removePassword)

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
				winner: removePassword(game.winner),
			} satisfies GameOverEntity
		}
	}
}

export const gameRepository = { gameList, createGame, getGame }
