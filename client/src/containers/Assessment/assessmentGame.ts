/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { TechName, Level } from '../../shared/types';
import {
  getTechnologiesNames,
  deepCopy,
  pickRandomElementsFromArray,
} from '../../utils/utils';
import { Icon, IconsGroup, AssessmentGameOptions } from './interfaces';

export function useAssessmentGame(gameOptions: AssessmentGameOptions) {
  const { level, onGameEnd } = gameOptions;
  const groupSize = 3; // 3 if tutor, 2 if senior...
  const rounds = 2; // 10 if tutor, 12 if senior...
  // const maxTimeForGroup = 5_000; // 5 seconds to drag all center icons

  const [groupsToDrag, setGroupsToDrag] = useState(
    createIconsToDrag(level, groupSize, rounds)
  );
  const [sideChoices, setSideChoices] = useState(
    createSideChoices(groupsToDrag)
  );

  // TODO: add the time when the game started
  const [round, setRound] = useState(0);
  const [matched, setMatched] = useState(0);
  // const [timeLeftForGroup, setTimeLeftForGroup] = useState(maxTimeForGroup);
  // const [iconsMatched, setIconsMatched] = useState(0);

  //  useEffect(updateTimeLeft,[]);

  function onIconMatch(techName: TechName) {
    setIconAsMatched(techName);

    const isRoundDone = matched === groupSize - 1;

    if (isRoundDone) {
      if (round < rounds) {
        setRound((r) => r + 1);
        setMatched(0);
      } else {
        onGameEnd(3);
      }
    } else {
      setMatched(matched + 1);
    }
  }

  function setIconAsMatched(techName: TechName) {
    // in the center group
    const toDragCopy = deepCopy(groupsToDrag);
    const centerIcon = findIconByTechName(toDragCopy[round].icons, techName);

    if (centerIcon) {
      centerIcon.isMatched = true;
      setGroupsToDrag(toDragCopy);
    } else {
      console.log('this should not happen!');
    }

    // in the sides
    const sideCopy = deepCopy(sideChoices);
    const sideIcon = findIconByTechName(sideCopy[round].icons, techName);

    if (sideIcon) {
      sideIcon.isMatched = true;
      setSideChoices(sideCopy);
    } else {
      console.log('this should not happen (2)!');
    }
  }

  const centerGroup = groupsToDrag[round];
  const sidesGroup = sideChoices[round];

  return { onIconMatch, centerGroup, sidesGroup, round };
}

export function createIconsToDrag(
  level: Level,
  groupSize: number,
  rounds: number
): IconsGroup[] {
  const iconsGroups: IconsGroup[] = [];

  // for every round
  for (let i = 0; i < rounds; i += 1) {
    // pick groupSize different icons
    const available = getTechnologiesNames();
    // const icons = available.slice(0, groupSize).map(makeIcon);
    const techNames = pickRandomElementsFromArray(available, groupSize);

    iconsGroups.push({
      groupIndex: i,
      icons: techNames.map(makeIcon),
    });
  }

  return iconsGroups;
}

function makeSideChoice(group: IconsGroup, groupIndex: number): IconsGroup {
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

function makeIcon(name: TechName): Icon {
  return {
    isMatched: false,
    name,
  };
}

function findIconByTechName(icons: Icon[], techName: TechName) {
  return icons.find((icon) => icon.name === techName);
}
