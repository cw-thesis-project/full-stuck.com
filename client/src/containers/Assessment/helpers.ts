/* eslint-disable no-restricted-syntax */
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
    sideIcons.push({
      name: otherNames[randomIndex],
      isMatched: false,
    });
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
  for (const { name } of technologies) {
    if (techExperience[name] === maxTechLevel) {
      return name;
    }
  }

  throw new Error(
    'You should not be able to play an assessment right now. Did you use the URL to get here? (or admin page)?'
  );
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

  for (const name of techNames) {
    experienceSum += techExperience[name];
  }

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

export function userAfterAssesment(user: User, hasWon: boolean): User {
  const newUser = deepCopy(user);

  const { techExperience, level, history } = newUser.gameData;

  const topic = getAssessmentTopic(techExperience);

  // save activity
  history.push({
    name: 'assessment',
    stars: hasWon ? 3 : 0,
    topic,
  });

  if (hasWon) {
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
