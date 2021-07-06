/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideDown, fadeIn, slideUp } from '../../shared/animations';
import quizGame from './QuizGame.module.scss';

function useQuizGameAnimations(): void {
  useEffect(animateAllItems, []);

  function animateAllItems() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${quizGame.header}`, slideUp, 0)
      .from(
        `.${quizGame.logosContainer}`,
        {
          ...fadeIn,
          y: '4em',
        },
        0
      )
      .from(`.${quizGame.helperText}`, slideDown, 0.5)
      .from(`.${quizGame.inputContainer}`, slideDown, 0.5);
    // .from(`.${cardsTable.container}`, slideUp, 0.15)
    // .from(`.${memoryGame.helperText}`, slideUp, 0.3)
    // .from(`.${memoryScore.container}`, slideRight, 0.45);
  }
}

export default useQuizGameAnimations;
