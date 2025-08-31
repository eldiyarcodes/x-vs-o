import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useId } from 'react'

export function AuthFormFields({
	login,
	password,
	onChangeLogin,
	onChangePassword,
}: {
	login: string
	password: string
	onChangeLogin: (login: string) => void
	onChangePassword: (password: string) => void
}) {
	const loginId = useId()
	const passwordId = useId()

	return (
		<>
			<div className='space-y-2'>
				<Label htmlFor={loginId} className='text-sm font-medium'>
					Email Address
				</Label>
				<Input
					id={loginId}
					type='email'
					placeholder='Enter your email'
					className='w-full'
					value={login}
					onChange={e => onChangeLogin(e.target.value)}
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label htmlFor={passwordId} className='text-sm font-medium'>
					Password
				</Label>
				<Input
					id={passwordId}
					type='password'
					placeholder='Create a password'
					className='w-full'
					value={password}
					onChange={e => onChangePassword(e.target.value)}
					required
				/>
			</div>
		</>
	)
}
