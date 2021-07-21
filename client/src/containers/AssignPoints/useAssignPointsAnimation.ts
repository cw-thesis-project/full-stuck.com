/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideUp, fadeIn, slideDown } from 'shared/animations';
import { playSound } from 'services/audioService';
import assignPoints from './AssignPoints.module.scss';

function useAssignPointsAnimation(): void {
  useEffect(animateAssignPointsComponents, []);

  function animateAssignPointsComponents() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${assignPoints.pageTitle}`, fadeIn)
      .from(`.${assignPoints.card}`, {
        ...slideUp,
        stagger: { each: 0.3, onStart: () => playSound('slide') },
      })
      .from(
        `.${assignPoints.footerText}`,
        { ...slideDown, onStart: () => playSound('slide') },
        2
      )
      .from(`.${assignPoints.scheduleButton}`, slideDown, 2)
      .from(`.${assignPoints.button}`, slideDown, 2);
  }
}

export default useAssignPointsAnimation;
