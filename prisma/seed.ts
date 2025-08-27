import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.game.createMany({
		data: [
			{ name: 'Chess' },
			{ name: 'Checkers' },
			{ name: 'Go' },
			{ name: 'Tic Tac Toe' },
		],
		skipDuplicates: true, // Skip duplicates based on the unique constraint
	})

	const allGames = await prisma.game.findMany()
	console.log(allGames)
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
