import { Level, TechExperience } from '../../shared/types';
import { technologies } from '../../utils/utils';
import { TechAchievements } from '../../components/LearntTech/LearntTech';

type levelMap = Record<Level, number>;

const levelToNumber: levelMap = {
  junior: 0,
  senior: 1,
  tutor: 2,
  CEO: 3,
};

export const createGreeting = (level: Level | undefined): string => {
  let greetingMessage = '';
  switch (level) {
    case 'junior':
      greetingMessage = "Let's GET Coding";
      break;
    case 'senior':
      greetingMessage = 'PUT your back into it';
      break;
    case 'tutor':
      greetingMessage = 'POST us a pun please';
      break;
    case 'CEO':
      greetingMessage = 'DELETE and start again';
      break;
    default:
      greetingMessage = '';
  }
  return greetingMessage;
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
  const userTechExperienceArray: [string, number][] =
    Object.entries(techExperience);

  userTechExperienceArray.forEach(([tech, userExperienceLevel]) => {
    const techLevel = technologies.find(
      (technology) => technology.name === tech
    )?.level;

    techAchievements[tech as keyof TechAchievements].level =
      userExperienceLevel;

    if (techLevel) {
      if (levelToNumber[userLevel] < levelToNumber[techLevel]) {
        techAchievements[tech as keyof TechAchievements].isLocked = true;
      }
    }
  });

  return techAchievements;
};
