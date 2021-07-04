import { Level, TechExperience } from '../../shared/types';
import { technologies, levelToNumber } from '../../shared/constants';
import { TechAchievements } from '../../components/LearntTech/LearntTech';

export const createGreeting = (level: Level): string => {
  const greetingsMap: Record<Level, string> = {
    junior: "Let's GET Coding!",
    senior: 'PUT your back into it!',
    tutor: 'POST us a pun please!',
    CEO: 'DELETE and start again!',
  };

  return greetingsMap[level];
};

const techAchievements: TechAchievements = {
  javascript: { experience: 0, isLocked: false },
  git: { experience: 0, isLocked: false },
  react: { experience: 0, isLocked: false },
  graphql: { experience: 0, isLocked: false },
  rxjs: { experience: 0, isLocked: false },
  typescript: { experience: 0, isLocked: false },
  debugging: { experience: 0, isLocked: false },
  eloquence: { experience: 0, isLocked: false },
  espionage: { experience: 0, isLocked: false },
};

export const createTechAchievements = (
  userLevel: Level,
  techExperience: TechExperience
): TechAchievements => {
  Object.entries(techExperience).forEach(([tech, userExperienceLevel]) => {
    techAchievements[tech as keyof TechAchievements].experience =
      userExperienceLevel;

    const technology = technologies.find((t) => t.name === tech);

    if (technology) {
      const techShouldBeLocked =
        levelToNumber[userLevel] < levelToNumber[technology.level];

      if (techShouldBeLocked) {
        techAchievements[tech as keyof TechAchievements].isLocked = true;
      }
    }
  });

  return techAchievements;
};
