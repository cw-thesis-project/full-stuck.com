/* eslint-disable no-restricted-syntax */
import { maxTechnologyExperience, technologies } from '../../shared/constants';
import { Activity, TechExperience } from '../../shared/types';

export function lastFiveElements<T>(list: T[]): T[] {
  const reversed = [...list].reverse();
  const endIndex = list.length % 6;
  return reversed.slice(0, endIndex);
}

export function getNextActivity(techExperience: TechExperience): Activity {
  for (const { name } of technologies) {
    if (techExperience[name] === maxTechnologyExperience) {
      return 'assessment';
    }
  }

  return 'memory';
}
