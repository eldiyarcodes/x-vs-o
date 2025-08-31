import { createUser } from '@/entities/user/server'
import { left, mapLeft } from '@/shared/lib/either'
import { z } from 'zod'

const formDataSchema = z.object({
	login: z.string().min(3).max(30),
	password: z.string().min(6).max(100),
})

export const signUpActions = async (state: unknown, formData: FormData) => {
	const data = Object.fromEntries(formData.entries())

	const result = formDataSchema.safeParse(data)

	if (!result.success) {
		return left(`${result.error.message}`)
	}

	const createUserResult = await createUser(result.data)

	return mapLeft(createUserResult, err => {
		return {
			'user-login-exists': 'Пользователь с таким ником уже существует',
		}[err]
	})
}
