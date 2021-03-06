import {
  TechName,
  Level,
  TechExperience,
  User,
  StarsCount,
} from '../../shared/types';
import { getUnlockedTechNames, deepCopy, shuffle } from '../../shared/utils';
import {
  technologies,
  maxTechnologyExperience as maxTechLevel,
} from '../../shared/constants';
import { Icon } from './interfaces';

export const scoreThresholds = [5, 10, 15];

export function makeIcon(name: TechName): Icon {
  return {
    isMatched: false,
    name,
  };
}

export function createCenterIcons(userLevel: Level, groupSize: number): Icon[] {
  const availableTechNames = getUnlockedTechNames(userLevel);

  return shuffle(availableTechNames).slice(0, groupSize).map(makeIcon);
}

export function createSideIcons(centerIcons: Icon[], userLevel: Level): Icon[] {
  const centerNames = centerIcons.map((icon) => icon.name);

  const otherNames = getUnlockedTechNames(userLevel).filter(
    (techName) => !centerNames.includes(techName)
  );

  const sideIcons = [...centerIcons];

  for (let i = centerIcons.length; i < 10; i += 1) {
    const randomIndex = Math.floor(Math.random() * otherNames.length);
    const name = otherNames[randomIndex];
    const isMatched = !centerNames.includes(name);
    sideIcons.push({ name, isMatched });
  }

  return shuffle(sideIcons);
}

export function findIconByTechName(
  icons: Icon[],
  techName: TechName
): Icon | undefined {
  return icons.find((icon) => icon.name === techName);
}

export const mockTechExperience: TechExperience = {
  javascript: 0,
  debugging: 0,
  eloquence: 0,
  espionage: 0,
  git: 0,
  graphql: 0,
  react: 0,
  rxjs: 0,
  typescript: 0,
};

export function getAssessmentTopic(techExperience: TechExperience): TechName {
  for (let i = 0; i < technologies.length; i += 1) {
    const { name } = technologies[i];
    if (techExperience[name] === maxTechLevel) {
      return name;
    }
  }

  throw new Error(`
  You should not be able to play an assessment.
  Did you get here modifying directly the URL?
  Are you coming from the admin page maybe?
  `);
}

export function shouldLevelUp(
  techExperience: TechExperience,
  level: Level
): boolean {
  if (level === 'CEO') {
    return false;
  }

  const techNames = technologies
    .filter((technology) => technology.level === level)
    .map((technology) => technology.name);

  let experienceSum = 0;

  techNames.forEach((techName) => {
    experienceSum += techExperience[techName];
  });

  return experienceSum === 3 * (maxTechLevel + 1) - 1;
}

export function nextUserLevel(level: Level): Level {
  const nextLevelMap: Record<Level, Level> = {
    junior: 'senior',
    senior: 'tutor',
    tutor: 'CEO',
    CEO: 'CEO',
  };

  return nextLevelMap[level];
}

export function userAfterAssessment(user: User, starsCount: StarsCount): User {
  const newUser = deepCopy(user);

  const { techExperience, level, history } = newUser.gameData;

  const topic = getAssessmentTopic(techExperience);

  // save activity
  history.push({
    name: 'assessment',
    stars: starsCount,
    topic,
  });

  if (starsCount > 0) {
    // level user up
    const isReadyToLevelUp = shouldLevelUp(techExperience, level);

    if (isReadyToLevelUp) {
      const nextLevel = nextUserLevel(level);
      newUser.gameData.level = nextLevel;
    }

    // update tech
    techExperience[topic] += 1;
  }

  return newUser;
}

export function getStars(totalMatchesCount: number): StarsCount {
  for (let i = 0; i < scoreThresholds.length; i += 1) {
    if (totalMatchesCount < scoreThresholds[i]) {
      return i as StarsCount;
    }
  }

  return 3;
}
