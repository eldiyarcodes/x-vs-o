'use client'

import { routes } from '@/kernel/routes'
import { useActionState } from '@/shared/lib/react'
import { signInActions, SignInFormState } from '../actions/sign-in'
import { AuthFormLayout } from '../view/auth-form-layout'
import { ErrorMessage } from '../view/error-message'
import { AuthFormFields } from '../view/fields'
import { AuthFormBottomLink } from '../view/link'
import { SubmitButton } from '../view/submit-button'

export function SignInForm() {
	const [formState, action, isPending] = useActionState(
		signInActions,
		{} as SignInFormState
	)

	return (
		<AuthFormLayout
			title='Sign In to Your Account'
			description='Welcome back! Please enter your details'
			fields={<AuthFormFields {...formState} />}
			error={<ErrorMessage error={formState.errors?._errors} />}
			formAction={action}
			actions={<SubmitButton isPending={isPending}>Sign In</SubmitButton>}
			link={
				<AuthFormBottomLink
					href={routes.signUp()}
					linkText='Sign up here'
					text='Dont have an account?'
				/>
			}
		/>
	)
}
