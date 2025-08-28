import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const user1 = await prisma.user.create({
		data: {
			login: 'player1',
			passwordHash: 'hash1',
			rating: 1200,
		},
	})
	const user2 = await prisma.user.create({
		data: {
			login: 'player2',
			passwordHash: 'hash1',
			rating: 1600,
		},
	})
	// await prisma.game.create({
	// 	data: {
	// 		status: 'idle',
	// 		players: {
	// 			connect: { id: user1.id },
	// 		},
	// 		field: Array(9).fill(null),
	// 	},
	// })
	// await prisma.game.create({
	// 	data: {
	// 		status: 'idle',
	// 		players: {
	// 			connect: { id: user2.id },
	// 		},
	// 		field: Array(9).fill(null),
	// 	},
	// })
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
