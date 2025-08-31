'use client'

import { right } from '@/shared/lib/either'
import { AuthFormLayout } from '../view/auth-form-layout'
import { ErrorMessage } from '../view/error-message'
import { AuthFormFields } from '../view/fields'
import { AuthFormBottomLink } from '../view/link'
import { SubmitButton } from '../view/submit-button'

export function SignUpForm() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Handle form submission logic here
	}

	return (
		<AuthFormLayout
			title='Create an account'
			description='Sign up to get started'
			fields={
				<AuthFormFields
					login=''
					password=''
					onChangeLogin={() => {}}
					onChangePassword={() => {}}
				/>
			}
			error={<ErrorMessage error={right(null)} />}
			onSubmit={handleSubmit}
			actions={<SubmitButton>Sign Up</SubmitButton>}
			link={
				<AuthFormBottomLink
					href='/sign-in'
					linkText='Sign in here'
					text='Already have an account?'
				/>
			}
		/>
	)
}
