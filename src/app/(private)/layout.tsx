import { sessionService } from '@/entities/user/server'
import { routes } from '@/kernel/routes'
import { Button } from '@/shared/ui/button'
import { redirect } from 'next/navigation'

export default async function Privatelayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { session } = await sessionService.verifySession()

	return (
		<div className='flex flex-col grow'>
			<header className='border-b border-b-primary/50'>
				<div className='py-4 flex gap-4 justify-between items-center max-w-[1200px] mx-auto max-[1260px]:px-10'>
					<div className='text-xl font-bold'>X-VS-O Online</div>
					<div className='flex items-center gap-4'>
						<div className='text-lg'>{session.login}</div>
						<form
							action={async () => {
								'use server'
								sessionService.deleteSession()
								redirect(routes.signIn())
							}}
						>
							<Button variant={'destructive'}>Sign Out</Button>
						</form>
					</div>
				</div>
			</header>
			{children}
		</div>
	)
}
