import { TechName, Level } from '../../shared/types';
import {
  getTechnologiesNames,
  deepCopy,
  pickRandomElementsFromArray,
} from '../../utils/utils';
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
