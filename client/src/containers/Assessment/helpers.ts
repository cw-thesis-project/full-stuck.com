/* eslint-disable no-restricted-syntax */
import { TechName, Level, TechExperience, User } from '../../shared/types';
import {
  getTechnologiesNames,
  deepCopy,
  pickRandomElementsFromArray,
} from '../../shared/utils';
import {
  technologies,
  maxTechnologyExperience as maxTechLevel,
} from '../../shared/constants';
import { Icon, IconsGroup } from './interfaces';
import { IconDescriptor } from '../../components/SideColumn/SideColumn';

export function makeIcon(name: TechName): Icon {
  return {
    isMatched: false,
    name,
  };
}

export function createIconsToDrag(
  level: Level,
  groupSize: number,
  rounds: number
): IconsGroup[] {
  const iconsGroups: IconsGroup[] = [];

  // for every round
  for (let i = 0; i < rounds; i += 1) {
    // choose #groupSize different icons
    const available = getTechnologiesNames();
    const techNames = pickRandomElementsFromArray(available, groupSize);

    iconsGroups.push({
      groupIndex: i,
      icons: techNames.map(makeIcon),
    });
  }

  return iconsGroups;
}

export function makeSideChoice(
  group: IconsGroup,
  groupIndex: number
): IconsGroup {
  const chosenNames = group.icons.map((icon) => icon.name);

  const sideGroup: IconsGroup = {
    groupIndex,
    icons: group.icons,
  };

  const otherNames = getTechnologiesNames().filter((techName) => {
    return !chosenNames.includes(techName);
  });

  for (let i = 0; i < 10 - chosenNames.length; i += 1) {
    sideGroup.icons.push({ isMatched: false, name: otherNames[0] });
  }

  return sideGroup;
}

export function createSideChoices(groupsToDrag: IconsGroup[]): IconsGroup[] {
  return deepCopy(groupsToDrag).map((group, i) => {
    return makeSideChoice(group, i);
  });
}

export function findIconByTechName(
  icons: Icon[],
  techName: TechName
): Icon | undefined {
  return icons.find((icon) => icon.name === techName);
}

export function getIconDescriptors(icons: Icon[]): IconDescriptor[] {
  return icons.map((icon) => {
    return {
      techName: icon.name,
      isGray: icon.isMatched,
    };
  });
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

  throw new Error('assessment topic not found');
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

export function userAfterAssessment(user: User, hasWon: boolean): User {
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
