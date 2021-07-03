import { Level, TechName } from './types';
import { technologies } from './constants';

export function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function isTechUnlocked(techLevel: Level, userLevel: Level): boolean {
  if (userLevel === 'tutor' || userLevel === 'CEO') {
    return true;
  }

  if (userLevel === 'senior') {
    return techLevel !== 'tutor';
  }

  return techLevel === 'junior';
}

export function getUnlockedTechNames(userLevel: Level): TechName[] {
  return technologies
    .filter((tech) => isTechUnlocked(tech.level, userLevel))
    .map((tech) => tech.name);
}

export function getTechnologiesNames(): TechName[] {
  return technologies.map((tech) => tech.name);
}

export function shuffle<T>(array: T[]): T[] {
  const arrayCopy = deepCopy(array);
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ];
  }

  return arrayCopy;
}
