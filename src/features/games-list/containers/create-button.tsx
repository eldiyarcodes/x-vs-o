'use client'

import { mapLeft, right } from '@/shared/lib/either'
import { useActionState } from '@/shared/lib/react'
import { Button } from '@/shared/ui/button'
import { startTransition } from 'react'
import { createGameActions } from '../actions/create-game'

export function CreateButton() {
	const [state, dispatch, isPending] = useActionState(
		createGameActions,
		right(undefined)
	)

	return (
		<Button
			disabled={isPending}
			onClick={() => startTransition(dispatch)}
			error={mapLeft(
				state,
				e =>
					({
						['You already have an idle game']: 'У вас уже есть созданная игра',
						['user not found']: 'Пользователь не найден',
					}[e])
			)}
		>
			Создать игру
		</Button>
	)
}
