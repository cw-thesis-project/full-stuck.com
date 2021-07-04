/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import { StarsCount, TechName } from '../../shared/types';
import { deepCopy } from '../../shared/utils';
import { createCards, getStarsCount } from './helpers';

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
  starsCount: StarsCount;
  handleCardChoice(index: number): void;
}

function useMemoryGame(): IMemoryGame {
  // states
  const [cards, setCards] = useState(createCards());
  const [matchesDone, setMatchesDone] = useState(0);
  const [lastMatched, setLastMatched] = useState<TechName>('git');
  const [flipsDone, setFlipsDone] = useState(0);
  const [upCards, setUpCards] = useState<Card[]>([]);
  const [starsCount, setStarsCount] = useState<StarsCount>(0);

  // effects
  useEffect(updateStarsCount, [matchesDone]);

  // game constants

  const allowedFlips = 45;
  const afterPairDelay = 300;

  // functions

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
    const updatedCards = newCards.map((newCard) => {
      return {
        ...newCard,
        state: newCard.name === cardName ? 'matched' : newCard.state,
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

  function updateStarsCount() {
    const newStarsCount = getStarsCount(matchesDone);
    setStarsCount(newStarsCount);
  }

  return {
    cards,
    matchesDone,
    lastMatched,
    flipsDone,
    allowedFlips,
    handleCardChoice,
    starsCount,
  };
}

export default useMemoryGame;
