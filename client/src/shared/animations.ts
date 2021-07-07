import { gsap } from 'gsap';

const unit = 48;
export const unitBig = '2em';
export const unitSmall = '0.5em';

// snippets

export const fadeIn: gsap.TweenVars = {
  opacity: 0,
  ease: 'power3.out',
};

export const slideUp: gsap.TweenVars = {
  ...fadeIn,
  y: unit,
};

export const slideDown: gsap.TweenVars = {
  ...fadeIn,
  y: -unit,
};

export const slideLeft: gsap.TweenVars = {
  ...fadeIn,
  x: unit,
};

export const slideRight: gsap.TweenVars = {
  ...fadeIn,
  x: -unit,
};

// helper functions

export function animateFrom(className: string, vars: gsap.TweenVars): void {
  gsap.from(`.${className}`, vars);
}

export function animateTo(className: string, vars: gsap.TweenVars): void {
  gsap.to(`.${className}`, vars);
}
