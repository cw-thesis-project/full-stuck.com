/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { TechName } from '../../shared/types';
import { deepCopy } from '../../shared/utils';
import { technologies } from './helpers';

export interface Card {
  name: TechName;
  state: 'down' | 'up' | 'matched';
}

interface IMemoryGame {
  cards: Card[];
  matchesDone: number;
  lastMatched: TechName;
  flipsDone: number;
  allowedFlips: number;
  handleCardChoice(index: number): void;
}

function useMemoryGame(): IMemoryGame {
  const [cards, setCards] = useState(createCards());
  const [matchesDone, setMatchesDone] = useState(0);
  const [lastMatched, setLastMatched] = useState<TechName>('git');
  const [flipsDone, setFlipsDone] = useState(0);
  const [upCards, setUpCards] = useState<Card[]>([]);

  const allowedFlips = 30;
  const afterPairDelay = 300;

  function handleCardChoice(index: number) {
    const newCards = deepCopy(cards);
    const card = newCards[index];

    if (upCards.length === 0) {
      handleFirstCardFlip(card, newCards);
      return;
    }

    const isSame = card.name === upCards[0].name;

    if (upCards.length === 1) {
      if (isSame) {
        handleMatchFlip(card, newCards);
      } else {
        handleDifferentChoice(card, newCards);
      }
    }
  }

  function handleMatchFlip(card: Card, newCards: Card[]) {
    card.state = 'up';
    setLastMatched(card.name);
    setMatchesDone(matchesDone + 1);
    setCards(newCards);
    setUpCards([...upCards, card]);

    setTimeout(() => afterMatchActions(card, newCards), afterPairDelay);
  }

  function afterMatchActions(card: Card, newCards: Card[]) {
    setUpCards([]);

    const cardName = card.name;
    const updatedCards = newCards.map((card) => {
      return {
        ...card,
        state: card.name === cardName ? 'matched' : card.state,
      };
    });

    setCards(updatedCards);
  }

  function handleFirstCardFlip(card: Card, newCards: Card[]) {
    card.state = 'up';
    setFlipsDone(flipsDone + 1);
    setUpCards([...upCards, card]);
    setCards(newCards);
  }

  function handleDifferentChoice(card: Card, newCards: Card[]) {
    card.state = 'up';
    setFlipsDone(flipsDone + 1);
    setUpCards([...upCards, card]);
    setCards(newCards);

    setTimeout(() => afterDifferentActions(newCards), afterPairDelay);
  }

  function afterDifferentActions(newCards: Card[]) {
    setUpCards([]);

    const noUpCards = newCards.map((card) => {
      return {
        ...card,
        state: card.state === 'up' ? 'down' : card.state,
      };
    });

    setCards(noUpCards);
  }

  return {
    cards,
    matchesDone,
    lastMatched,
    flipsDone,
    allowedFlips,
    handleCardChoice,
  };
}

function createCards() {
  const halfCards: Card[] = technologies.map((tech) => {
    return {
      name: tech.name,
      state: 'down',
    };
  });

  return [...halfCards, ...halfCards];
}

export default useMemoryGame;
