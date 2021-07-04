import { maxTechnologyExperience, technologies } from '../../shared/constants';
import { Activity, TechExperience } from '../../shared/types';
import { deepCopy } from '../../shared/utils';

export function lastFiveElements<T>(list: T[]): T[] {
  const listCopy = deepCopy(list);
  return listCopy.slice(list.length - 5, list.length);
}

export function getNextActivity(techExperience: TechExperience): Activity {
  for (let i = 0; i < technologies.length; i += 1) {
    const { name } = technologies[i];
    if (techExperience[name] === maxTechnologyExperience) {
      return 'assessment';
    }
  }

  return 'memory';
}
