/* eslint-disable import/no-unresolved */
import sounds from 'assets/audio';

export type SoundName =
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
  const howl = sounds[name];
  setTimeout(() => {
    howl.play();
  }, delaySeconds * 1_000);
}
