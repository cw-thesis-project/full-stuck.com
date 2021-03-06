/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideUp, slideDown } from '../../shared/animations';
import gameOver from './GameOver.module.scss';
import stars from '../StarsRow/StarsRow.module.scss';

function useGameOverAnimations(): void {
  useEffect(animateGameOverAnimations, []);

  function animateGameOverAnimations() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${gameOver.title}`, slideUp)
      .from(`.${gameOver.subtitle}`, slideUp, '<')
      .from(
        `.${stars.star}`,
        {
          ...slideUp,
          duration: 0.3,
          stagger: 0.15,
        },
        0.6
      )
      .from(`.${gameOver.button}`, slideDown, 1.2);
  }
}

export default useGameOverAnimations;
