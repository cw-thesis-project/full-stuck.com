import { gsap } from 'gsap';

export const unit = '1em';
export const unitBig = '2em';
export const unitSmall = '0.5em';

export function animateFrom(className: string, vars: gsap.TweenVars): void {
  gsap.from(`.${className}`, vars);
}

export function animateTo(className: string, vars: gsap.TweenVars): void {
  gsap.to(`.${className}`, vars);
}
