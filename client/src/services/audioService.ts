/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Howl } from 'howler';
import { swipe } from 'assets/audio';

type SoundName = 'scheduleCard';

export function playSound(name: SoundName, delaySeconds = 0): void {
  const howl = soundsMap[name];
  setTimeout(() => {
    howl.play();
  }, delaySeconds * 1_000);
}

export const a = {};

const soundsMap: Record<SoundName, Howl> = {
  scheduleCard: swipe,
};
