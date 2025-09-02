import { useEffect, useState } from 'react'

export function useEventsSource<T>(url: string) {
	const [data, setData] = useState<T>()
	const [isPending, setIsPending] = useState(true)
	const [err, setErr] = useState<unknown | undefined>()

	useEffect(() => {
		const gameEvents = new EventSource(url)

		gameEvents.addEventListener('message', msg => {
			try {
				setIsPending(false)
				setData(JSON.parse(msg.data))
				setErr(undefined)
			} catch (e) {
				setErr(e)
			}
		})

		gameEvents.addEventListener('error', e => setErr(e))

		return () => gameEvents.close()
	}, [url])

	return { dataStream: data, error: err, isPending }
}
