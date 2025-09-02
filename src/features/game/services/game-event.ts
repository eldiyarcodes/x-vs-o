import { GameDomain } from '@/entities/game'

type GameEvent = {
	type: 'game-changed'
	data: GameDomain.GameEntity
}


export function addListener(){
	
}


export const gameEvents = { addListener }
