import { gsap } from 'gsap';

export const unit = '1em';
export const unitBig = '2em';
export const unitSmall = '0.5em';

// snippets

export const fadeIn: gsap.TweenVars = {
  opacity: 0,
  ease: 'power3.out',
};

export const slideUp: gsap.TweenVars = {
  ...fadeIn,
  y: '2em',
};

export const slideLeft: gsap.TweenVars = {
  ...fadeIn,
  x: '2em',
};

// helper functions

export function animateFrom(className: string, vars: gsap.TweenVars): void {
  gsap.from(`.${className}`, vars);
}

export function animateTo(className: string, vars: gsap.TweenVars): void {
  gsap.to(`.${className}`, vars);
}
