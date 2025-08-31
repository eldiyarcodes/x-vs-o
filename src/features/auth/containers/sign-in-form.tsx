'use client'

import { right } from '@/shared/lib/either'
import { AuthFormLayout } from '../view/auth-form-layout'
import { ErrorMessage } from '../view/error-message'
import { AuthFormFields } from '../view/fields'
import { AuthFormBottomLink } from '../view/link'
import { SubmitButton } from '../view/submit-button'

export function SignInForm() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Handle form submission logic here
	}

	return (
		<AuthFormLayout
			title='Sign In to Your Account'
			description='Welcome back! Please enter your details'
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
			actions={<SubmitButton>Sign In</SubmitButton>}
			link={
				<AuthFormBottomLink
					href='/sign-up'
					linkText='Sign up here'
					text='Dont have an account?'
				/>
			}
		/>
	)
}
