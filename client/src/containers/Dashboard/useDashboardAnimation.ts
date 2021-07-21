/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideUp, fadeIn, slideLeft } from 'shared/animations';
import { playSound } from 'services/audioService';
import roadmap from './Roadmap/Roadmap.module.scss';
import dashboard from './Dashboard.module.scss';
import appLogo from './SmallAppLogo/SmallAppLogo.module.scss';

const slideDown: gsap.TweenVars = {
  ...fadeIn,
  y: '-2em',
};

function useDashboardAnimation(): void {
  useEffect(animateDashboardComponents, []);

  function animateDashboardComponents() {
    gsap
      .timeline({ delay: 0.5 })
      .from(`.${dashboard.header}`, {
        ...slideUp,
        onStart: () => playSound('scheduleCard'),
      })
      .from(`.${dashboard.learntTech}`, {
        ...slideUp,
        onStart: () => playSound('scheduleCard'),
      })
      .from(`.${dashboard.footer}`, slideDown)
      .from(
        `.${appLogo.logo}`,
        {
          ...slideLeft,
          onStart: () => playSound('scheduleCard'),
        },
        0.9
      )
      .from(`.${roadmap.container}`, slideLeft, 0.9);
  }
}

export default useDashboardAnimation;
