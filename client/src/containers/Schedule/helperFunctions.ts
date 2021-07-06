import { maxTechnologyExperience, technologies } from '../../shared/constants';
import { Activity, TechExperience } from '../../shared/types';

export function lastFiveElements<T>(list: T[]): T[] {
  const pastLength = list.length % 6;

  return list.slice(list.length - pastLength, list.length);
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
