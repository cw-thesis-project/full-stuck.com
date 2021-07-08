/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideRight, slideUp } from '../../shared/animations';
import cardsTable from '../../components/CardsTable/CardsTable.module.scss';
import flipCounter from '../../components/FlipsCounter/FlipsCounter.module.scss';
import memoryScore from '../../components/MemoryScore/MemoryScore.module.scss';
import memoryGame from './MemoryGame.module.scss';

function useMemoryGameAnimations(): void {
  useEffect(animateCenterItems, []);

  function animateCenterItems() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${flipCounter.container}`, slideUp, 0)
      .from(`.${cardsTable.container}`, slideUp, 0.15)
      .from(`.${memoryGame.helperText}`, slideUp, 0.3)
      .from(`.${memoryScore.container}`, slideRight, 0.45);
  }
}

export default useMemoryGameAnimations;
