'use client'

import Link from 'next/link'

export function AuthFormBottomLink({
	linkText,
	text,
	href,
}: {
	linkText: string
	text: string
	href: string
}) {
	return (
		<p className='text-sm text-muted-foreground'>
			{text}{' '}
			<Link
				href={href}
				className='text-primary font-medium underline underline-offset-4'
			>
				{linkText}
			</Link>
		</p>
	)
}
