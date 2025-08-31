import { left, right } from '@/shared/lib/either'
import cuid from 'cuid'
import { DEFAULT_USER_RATING } from '../domain'
import { userRepository } from '../repositories/user-repository'
import { passwordService } from './password'

export const createUser = async ({
	login,
	password,
}: {
	login: string
	password: string
}) => {
	const userWithLogin = await userRepository.getUser({ login })

	if (userWithLogin) {
		return left('user-login-exists' as const)
	}

	const { hash, salt } = await passwordService.hashPassword(password)

	const user = await userRepository.saveUser({
		id: cuid(),
		login,
		rating: DEFAULT_USER_RATING,
		passwordHash: hash,
		salt,
	})

	return right(user)
}
