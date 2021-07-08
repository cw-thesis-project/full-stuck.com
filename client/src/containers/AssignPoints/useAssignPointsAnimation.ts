/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideUp, fadeIn, slideDown } from '../../shared/animations';
import assignPoints from './AssignPoints.module.scss';

function useAssignPointsAnimation(): void {
  useEffect(animateAssignPointsComponents, []);

  function animateAssignPointsComponents() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${assignPoints.pageTitle}`, fadeIn)
      .from(`.${assignPoints.card}`, {
        ...slideUp,
        stagger: 0.3,
      })
      .from(`.${assignPoints.footerText}`, slideDown, 2)
      .from(`.${assignPoints.scheduleButton}`, slideDown, 2)
      .from(`.${assignPoints.button}`, slideDown, 2);
  }
}

export default useAssignPointsAnimation;
