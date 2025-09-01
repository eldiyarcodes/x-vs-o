import { sessionService } from '@/entities/user/server'
import { Button } from '@/shared/ui/button'

export default async function Privatelayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { session } = await sessionService.verifySession()

	return (
		<div>
			<header className='border-b border-b-primary/50'>
				<div className='py-4 flex gap-4 justify-between items-center max-w-[1200px] mx-auto max-[1260px]:px-10'>
					<div className='text-xl'>X-VS-O Online</div>
					<div className='flex items-center gap-4'>
						<div className='text-lg'>{session.}</div>
						<Button variant={'destructive'}>Sign Out</Button>
					</div>
				</div>
			</header>
			{children}
		</div>
	)
}
