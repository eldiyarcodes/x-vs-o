import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useId } from 'react'

export function AuthFormFields() {
	const loginId = useId()
	const passwordId = useId()

	return (
		<>
			<div className='space-y-2'>
				<Label htmlFor={loginId} className='text-sm font-medium'>
					Login
				</Label>
				<Input
					id={loginId}
					type='text'
					name='login'
					placeholder='Enter your login'
					className='w-full'
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
					name='password'
					placeholder='Create a password'
					className='w-full'
					required
				/>
			</div>
		</>
	)
}
