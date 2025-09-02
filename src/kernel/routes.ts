import { GameId } from './ids'

export const routes = {
	game: (gameId: GameId) => `/game/${gameId}`,
	gameStream: (gameId: GameId) => `/game/${gameId}/stream`,
	signIn: () => '/sign-in',
	signUp: () => '/sign-up',
}
