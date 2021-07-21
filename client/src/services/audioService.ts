/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Howl } from 'howler';
import { swipe } from 'assets/audio';

type SoundName =
  | 'buttonClick'
  | 'cardFlip'
  | 'dragFailure'
  | 'dragStart'
  | 'dragSuccess'
  | 'gameOver'
  | 'gameWon'
  | 'letterTyped'
  | 'mistake'
  | 'slide'
  | 'snakeChangeDirection'
  | 'snakeEat'
  | 'stars'
  | 'techLearnt';

export function playSound(name: SoundName, delaySeconds = 0): void {
  const howl = soundsMap[name];
  setTimeout(() => {
    howl.play();
  }, delaySeconds * 1_000);
}

export const a = {};

const soundsMap: Record<SoundName, Howl> = {
  buttonClick: swipe,
  cardFlip: swipe,
  dragFailure: swipe,
  dragStart: swipe,
  dragSuccess: swipe,
  gameOver: swipe,
  gameWon: swipe,
  letterTyped: swipe,
  mistake: swipe,
  slide: swipe,
  snakeChangeDirection: swipe,
  snakeEat: swipe,
  stars: swipe,
  techLearnt: swipe,
};
