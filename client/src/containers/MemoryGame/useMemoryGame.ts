/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react';
import { StarsCount, TechName } from '../../shared/types';
import { deepCopy, sleep } from '../../shared/utils';
import { createCards, getStarsCount } from './helpers';

export interface Card {
  name: TechName;
  state: 'down' | 'up' | 'matched';
}

interface IMemoryGame {
  gameState: MemoryGameState;
  handleCardChoice(index: number): void;
}

interface MemoryGameState {
  cards: Card[];
  matchesDone: number;
  flipsDone: number;
  upCards: Card[];
  starsCount: StarsCount;
  isOver: boolean;
}

interface MemoryGameOptions {
  onGameOver(starsCount: StarsCount): void;
}

// game constants

export const allowedFlips = 45;
const afterPairDelay = 300;

function useMemoryGame(options: MemoryGameOptions): IMemoryGame {
  const [gameState, setGameState] = useState<MemoryGameState>({
    cards: createCards(),
    matchesDone: 0,
    flipsDone: 0,
    upCards: [],
    starsCount: 0,
    isOver: false,
  });

  // functions
  useEffect(checkIfGameOver, [gameState]);

  function handleCardChoice(index: number) {
    const newCards = deepCopy(gameState.cards);
    const card = newCards[index];

    if (gameState.upCards.length === 0) {
      handleFirstCardFlip(card, newCards);
      return;
    }

    const isSame = card.name === gameState.upCards[0].name;

    if (gameState.upCards.length === 1) {
      if (isSame) {
        handleMatchFlip(card, newCards);
      } else {
        handleDifferentChoice(card, newCards);
      }
    }
  }

  function checkIfGameOver() {
    if (gameState.isOver) {
      return;
    }

    const areAllCardsMatched =
      gameState.matchesDone >= gameState.cards.length / 2;
    const areAllFlipsUsed = gameState.flipsDone >= allowedFlips;

    if (areAllFlipsUsed || areAllCardsMatched) {
      options.onGameOver(gameState.starsCount);

      setGameState((state) => ({
        ...state,
        isOver: true,
      }));
    }
  }

  async function handleMatchFlip(card: Card, newCards: Card[]) {
    const newCard: Card = { ...card, state: 'up' };

    setGameState((state) => ({
      ...state,
      matchesDone: state.matchesDone + 1,
      cards: newCards,
      upCards: [...state.upCards, newCard],
      starsCount: getStarsCount(state.matchesDone + 1),
    }));

    afterMatchActions(card, newCards);
  }

  async function afterMatchActions(card: Card, newCards: Card[]) {
    const updatedCards = newCards.map((newCard) => ({
      ...newCard,
      state: newCard.name === card.name ? 'matched' : newCard.state,
    }));

    await sleep(afterPairDelay);

    setGameState((state) => ({
      ...state,
      upCards: [],
      cards: updatedCards,
    }));
  }

  function handleFirstCardFlip(card: Card, newCards: Card[]) {
    const newCard: Card = { ...card, state: 'up' };

    setGameState((state) => ({
      ...state,
      flipsDone: state.flipsDone + 1,
      upCards: [...state.upCards, newCard],
      cards: newCards,
    }));
  }

  function handleDifferentChoice(card: Card, newCards: Card[]) {
    const newCard: Card = { ...card, state: 'up' };

    setGameState((state) => ({
      ...state,
      flipsDone: state.flipsDone + 1,
      upCards: [...state.upCards, newCard],
      cards: newCards,
      starsCount: getStarsCount(state.flipsDone + 1),
    }));

    afterDifferentActions(newCards);
  }

  async function afterDifferentActions(newCards: Card[]) {
    const noUpCards = newCards.map((card) => ({
      ...card,
      state: card.state === 'up' ? 'down' : card.state,
    }));

    await sleep(afterPairDelay);

    setGameState((state) => ({
      ...state,
      upCards: [],
      cards: noUpCards,
    }));
  }

  return { gameState, handleCardChoice };
}

export default useMemoryGame;
