'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'

export function AuthFormLayout({
	title,
	description,
	fields,
	actions,
	link,
	error,
	onSubmit,
}: {
	title?: string
	description?: string
	fields?: React.ReactNode
	actions?: React.ReactNode
	link?: React.ReactNode
	error?: React.ReactNode
	onSubmit?: React.FormEventHandler<HTMLFormElement>
}) {
	return (
		<Card className='w-full max-w-md'>
			<CardHeader className='text-center space-y-2'>
				<CardTitle className='text-2xl font-bold text-balance'>
					{title}
				</CardTitle>
				<CardDescription className='text-muted-foreground'>
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<form onSubmit={onSubmit} className='space-y-4'>
					{fields}
					{error}
					{actions}
				</form>
				<CardFooter className='text-center pt-4 border-t border-border'>
					{link}
				</CardFooter>
			</CardContent>
		</Card>
	)
}
