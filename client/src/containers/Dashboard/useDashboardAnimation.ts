/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideUp, fadeIn, slideLeft } from '../../shared/animations';
import dashboard from './Dashboard.module.scss';
import roadmap from '../../components/Roadmap/Roadmap.module.scss';

const slideDown: gsap.TweenVars = {
  ...fadeIn,
  y: '-2em',
};

function useDashboardAnimation(): void {
  useEffect(animateDashboardComponents, []);

  function animateDashboardComponents() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${dashboard.header}`, slideUp)
      .from(`.${dashboard.learntTech}`, slideUp)
      .from(`.${dashboard.footer}`, slideDown)
      .from(`.${dashboard.logo}`, slideLeft, 0.9)
      .from(`.${roadmap.container}`, slideLeft, 0.9);
  }
}

export default useDashboardAnimation;
