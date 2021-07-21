/* eslint-disable import/no-unresolved */
import { StarsCount, TechName } from 'shared/types';

export interface Card {
  name: TechName;
  state: 'down' | 'up' | 'matched';
}

export interface IMemoryGame {
  gameState: MemoryGameState;
  handleCardChoice(index: number): void;
}

export interface MemoryGameState {
  cards: Card[];
  matchesDone: number;
  flipsDone: number;
  upCards: Card[];
  starsCount: StarsCount;
  isOver: boolean;
}

export interface MemoryGameOptions {
  onGameOver(starsCount: StarsCount): void;
}
