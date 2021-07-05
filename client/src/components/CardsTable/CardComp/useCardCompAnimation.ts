/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { CardState } from './CardComp';

function useCardCompAnimation(containerRef: any, cardState: CardState): void {
  useEffect(flipCard, [cardState]);

  function flipCard() {
    gsap.to(containerRef.current, {
      rotateY: cardState === 'up' ? 180 : 0,
      scaleX: cardState === 'up' ? -1 : 1,
    });
  }
}

export default useCardCompAnimation;
