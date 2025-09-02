import { userRepository } from '../repositories/user-repository'
import { sessionService } from './session'

export const getCurrentUser = async () => {
	const { session } = await sessionService.verifySession()

	return userRepository.getUser({ id: session.id })
}
