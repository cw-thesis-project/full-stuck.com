/* eslint-disable no-restricted-syntax */
import { Level, TechExperience } from '../../shared/types';
import { technologies } from '../../shared/constants';
import { TechAchievements } from '../../components/LearntTech/LearntTech';

type levelMap = Record<Level, number>;

const levelToNumber: levelMap = {
  junior: 0,
  senior: 1,
  tutor: 2,
  CEO: 3,
};

export const createGreeting = (level: Level): string => {
  const greetingsMap: Record<Level, string> = {
    junior: "Let's GET Coding",
    senior: 'PUT your back into it',
    tutor: 'POST us a pun please',
    CEO: 'DELETE and start again',
  };

  return greetingsMap[level];
};

const techAchievements: TechAchievements = {
  javascript: { level: 0, isLocked: false },
  git: { level: 0, isLocked: false },
  react: { level: 0, isLocked: false },
  graphql: { level: 0, isLocked: false },
  rxjs: { level: 0, isLocked: false },
  typescript: { level: 0, isLocked: false },
  debugging: { level: 0, isLocked: false },
  eloquence: { level: 0, isLocked: false },
  espionage: { level: 0, isLocked: false },
};

export const createTechAchievements = (
  userLevel: Level,
  techExperience: TechExperience
): TechAchievements => {
  for (const [tech, userExperienceLevel] of Object.entries(techExperience)) {
    techAchievements[tech as keyof TechAchievements].level =
      userExperienceLevel;

    const technology = technologies.find((t) => t.name === tech);

    if (technology) {
      const techShouldBeLocked =
        levelToNumber[userLevel] < levelToNumber[technology.level];

      if (techShouldBeLocked) {
        techAchievements[tech as keyof TechAchievements].isLocked = true;
      }
    }
  }

  return techAchievements;
};
