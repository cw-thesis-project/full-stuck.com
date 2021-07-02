import { Level, LevelMap, TechName } from './types';
import { technologies } from './constants';

export function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function pickRandomElementsFromArray<T>(array: T[], count: number): T[] {
  return array.slice(0, count);
  // const choices = deepCopy(array);
  // const picks: T[] = [];

  // for (let i = 0; i < count; i += 1) {
  //   const randomIndex = Math.floor(Math.random() * choices.length);
  //   picks.push(choices[randomIndex]);
  //   choices.splice(randomIndex);
  // }

  // return picks;
}

export function isUnlocked(currentLevel: Level, targetLevel: Level): boolean {
  if (currentLevel === 'tutor' || currentLevel === 'CEO') {
    return true;
  }

  if (currentLevel === 'senior') {
    return targetLevel !== 'tutor';
  }

  return targetLevel === 'junior';
}

export function getUnlockedTechNames(): TechName[] {
  // .filter((tech) => isUnlocked(level, tech.level))
  return technologies.map((tech) => tech.name);
}

export function getTechnologiesNames(): TechName[] {
  return technologies.map((tech) => tech.name);
}
export const a = 1;

export const levelToNumber: LevelMap = {
  junior: 0,
  senior: 1,
  tutor: 2,
  CEO: 3,
};

export const maxBubbles = 3;
