import { left } from '@/shared/lib/either'

export const signUpActions = async (state: unknown, formData: FormData) => {
	console.log('Form Data:', formData.get('login'), formData.get('password'))

	return left('login-already-exists' as const)
}
