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
      .from(`.${flipCounter.container}`, slideUp)
      .from(`.${cardsTable.container}`, slideUp)
      .from(`.${memoryGame.helperText}`, slideUp)
      .from(`.${memoryScore.container}`, slideRight);
  }
}

export default useMemoryGameAnimations;
