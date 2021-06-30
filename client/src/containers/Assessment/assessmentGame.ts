/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { TechName, Level } from '../../shared/types';
import useElapsedTime from '../../shared/useElapsedTime';
import {
  getTechnologiesNames,
  deepCopy,
  pickRandomElementsFromArray,
} from '../../utils/utils';
import { Icon, IconsGroup, AssessmentGameOptions } from './interfaces';

export function useAssessmentGame(gameOptions: AssessmentGameOptions) {
  const { level, onGameEnd } = gameOptions;

  // game constants
  const groupSize = 3;
  const rounds = 2;
  const maxTimeForGroup = 5;

  const atCenter = createIconsToDrag(level, groupSize, rounds);
  const atSides = createSideChoices(atCenter);

  // icons states
  const [groupsToDrag, setGroupsToDrag] = useState(atCenter);
  const [sideChoices, setSideChoices] = useState(atSides);

  // time states
  const [gameTime] = useElapsedTime(Date.now());
  const [groupTime] = useElapsedTime(Date.now());

  // counter states
  const [round, setRound] = useState(0);
  const [matched, setMatched] = useState(0);

  function onIconMatch(techName: TechName) {
    matchCenterIcon(techName);
    matchSideIcon(techName);
    handleRoundProgression();
  }

  function matchCenterIcon(techName: TechName) {
    const toDragCopy = deepCopy(groupsToDrag);
    const icon = findIconByTechName(toDragCopy[round].icons, techName);

    if (icon) {
      icon.isMatched = true;
      setGroupsToDrag(toDragCopy);
    }
  }

  function matchSideIcon(techName: TechName) {
    const sideCopy = deepCopy(sideChoices);
    const icon = findIconByTechName(sideCopy[round].icons, techName);

    if (icon) {
      icon.isMatched = true;
      setSideChoices(sideCopy);
    }
  }

  function handleRoundProgression() {
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

  // conversions before returning
  const groupTimeLeftPercent = (groupTime / maxTimeForGroup) * 100;
  const centerGroup = groupsToDrag[round];
  const sidesGroup = sideChoices[round];

  return {
    onIconMatch,
    centerGroup,
    sidesGroup,
    round,
    groupTimeLeftPercent,
    rounds,
    gameTime,
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
