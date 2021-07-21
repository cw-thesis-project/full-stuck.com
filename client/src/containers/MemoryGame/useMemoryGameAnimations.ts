/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideDown, slideRight, slideUp } from 'shared/animations';
import { playSound } from 'services/audioService';
import cardsTable from './CardsTable/CardsTable.module.scss';
import flipCounter from './FlipsCounter/FlipsCounter.module.scss';
import memoryScore from './MemoryScore/MemoryScore.module.scss';
import memoryGame from './MemoryGame.module.scss';

function useMemoryGameAnimations(): void {
  useEffect(animateCenterItems, []);

  function animateCenterItems() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${flipCounter.container}`, slideUp, 0)
      .from(
        `.${cardsTable.container}`,
        { ...slideUp, onStart: () => playSound('scheduleCard') },
        0.15
      )
      .from(`.${memoryGame.helperText}`, slideDown, 0.6)
      .from(`.${memoryScore.container}`, slideRight, '<');
  }
}

export default useMemoryGameAnimations;
