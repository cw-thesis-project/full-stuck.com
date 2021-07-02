import { Activity, TechExperience, Tech } from '../../shared/types';

export function lastFiveElements<T>(list: T[]): T[] {
  const reversed = [...list].reverse();
  const endIndex = list.length % 6;
  return reversed.slice(0, endIndex);
}

// const technologies: Tech[] = [
//   { name: 'javascript', level: 'junior' },
//   { name: 'git', level: 'junior' },
//   { name: 'react', level: 'junior' },
//   { name: 'graphql', level: 'senior' },
//   { name: 'rxjs', level: 'senior' },
//   { name: 'typescript', level: 'senior' },
//   { name: 'debugging', level: 'tutor' },
//   { name: 'eloquence', level: 'tutor' },
//   { name: 'espionage', level: 'tutor' },
// ];

export function getNextActivity(): Activity {
  return Math.random() > 0.5 ? 'assessment' : 'memory';
  // for (const { name } of technologies) {
  //   if (techExperience[name] === 3) {
  //     return 'assessment';
  //   }
  // }

  // return 'memory';
}
