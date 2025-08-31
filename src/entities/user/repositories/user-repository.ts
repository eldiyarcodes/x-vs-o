import { prisma } from '@/shared/lib/db'
import { Prisma } from '@prisma/client'
import { UserEntity } from '../domain'

function saveUser(user: UserEntity): Promise<UserEntity> {
	return prisma.user.upsert({
		where: { id: user.id },
		create: user,
		update: user,
	})
}

function getUser(where: Prisma.UserWhereInput) {
	return prisma.user.findFirst({
		where,
	})
}

export const userRepository = { saveUser, getUser }
