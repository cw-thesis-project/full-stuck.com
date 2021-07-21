/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { slideDown, fadeIn } from 'shared/animations';
import splash from './Splash.module.scss';
import appLogo from './AppLogo/AppLogo.module.scss';

function useSplashAnimations(): void {
  useEffect(animateItems, []);

  function animateItems() {
    gsap
      .timeline()
      .to(`.${appLogo.logo}`, {
        y: '10em',
      })
      .from(`.${appLogo.logoPart}`, {
        ...fadeIn,
        y: 'random(-100, 100, 5)',
        stagger: 0.15,
        delay: 0.5,
      })
      .to(`.${appLogo.logo}`, {
        y: 0,
      })
      .from(`.${splash.subtitle}`, slideDown, '<')
      .from(`.${splash.button}`, slideDown, '<');
  }
}

export default useSplashAnimations;
