import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export default function GameCard({
	login,
	rating,
}: {
	login: string
	rating: number
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Игра с: {login}</CardTitle>
			</CardHeader>

			<CardContent>Rating: {rating}</CardContent>
		</Card>
	)
}
