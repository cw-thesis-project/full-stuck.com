/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideDown, fadeIn, slideUp } from 'shared/animations';
import { playSound } from 'services/audioService';
import techLogo from 'components/TechLogo/TechLogo.module.scss';
import quizGame from './QuizGame.module.scss';

function useQuizGameAnimations(currentIndex: number): void {
  useEffect(animateAllItems, []);
  useEffect(animateLogos, [currentIndex]);

  function animateAllItems() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${quizGame.header}`, slideUp, 0)
      .from(
        `.${quizGame.logosContainer}`,
        {
          ...fadeIn,
          y: '4em',
          onStart: () => playSound('slide'),
        },
        0
      )
      .from(`.${quizGame.helperText}`, slideDown, 0.5)
      .from(`.${quizGame.inputContainer}`, slideDown, 0.5);
  }

  function animateLogos() {
    gsap.from(`.${techLogo.logoContainer}`, {
      ...slideUp,
      stagger: 0.15,
      onStart: () => playSound('slide'),
    });
  }
}

export default useQuizGameAnimations;
