import { UserId } from '@/kernel/ids'

export type UserEntity = {
	id: UserId
	login: string
	rating: number
	passwordHash: string
	salt: string
}

export type SessionEntity = {
	id: UserId
	login: string
	expiredAt: string
}

export const DEFAULT_USER_RATING = 1200

export const userToSession = (
	user: UserEntity,
	expiredAt: string
): SessionEntity => {
	return {
		id: user.id,
		login: user.login,
		expiredAt,
	}
}
