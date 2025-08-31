'use client'

import { right } from '@/shared/lib/either'
import { useActionState } from '@/shared/lib/react'
import { signUpActions } from '../actions/sign-up'
import { AuthFormLayout } from '../view/auth-form-layout'
import { ErrorMessage } from '../view/error-message'
import { AuthFormFields } from '../view/fields'
import { AuthFormBottomLink } from '../view/link'
import { SubmitButton } from '../view/submit-button'

export function SignUpForm() {
	const [formState, action, isPending] = useActionState(
		signUpActions,
		right(undefined)
	)

	return (
		<AuthFormLayout
			title='Create an account'
			description='Sign up to get started'
			fields={<AuthFormFields />}
			error={<ErrorMessage error={formState} />}
			formAction={action}
			actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
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
