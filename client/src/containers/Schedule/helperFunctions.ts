/* eslint-disable no-restricted-syntax */
import { maxTechnologyExperience, technologies } from '../../shared/constants';
import { Activity, TechExperience } from '../../shared/types';
import { deepCopy } from '../../shared/utils';

export function lastFiveElements<T>(list: T[]): T[] {
  const listCopy = deepCopy(list);
  return listCopy.slice(list.length - 5, list.length);
}

export function getNextActivity(techExperience: TechExperience): Activity {
  for (const { name } of technologies) {
    if (techExperience[name] === maxTechnologyExperience) {
      return 'assessment';
    }
  }

  return 'memory';
}
