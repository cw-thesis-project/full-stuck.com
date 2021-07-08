/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideDown, fadeIn, slideUp } from '../../shared/animations';
import quizGame from './QuizGame.module.scss';
import techLogo from '../../components/TechLogo/TechLogo.module.scss';

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
    });
  }
}

export default useQuizGameAnimations;
