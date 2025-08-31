import { Button } from '@/shared/ui/button'

export function SubmitButton({ children }: { children: React.ReactNode }) {
	return (
		<Button type='submit' className='w-full bg-primary text-primary-foreground'>
			{children}
		</Button>
	)
}
