/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import { StarsCount, TechName } from '../../shared/types';
import { deepCopy } from '../../shared/utils';
import { AssessmentGameOptions, IAssessmentGame } from './interfaces';
import * as helpers from './helpers';

function useAssessmentGame(
  gameOptions: AssessmentGameOptions
): IAssessmentGame {
  const { level, onGameEnd, gameStartTime } = gameOptions;

  // game constants
  const groupSize = 3;
  // TODO: make game longer (for production)
  const gameDuration = 20_000;

  const initialCenterIcons = helpers.createCenterIcons(level, groupSize);
  const initialSideIcons = helpers.createSideIcons(initialCenterIcons, level);

  let intervalId: NodeJS.Timeout;

  // states
  const [centerIcons, setCenterIcons] = useState(initialCenterIcons);
  const [sideIcons, setSideIcons] = useState(initialSideIcons);
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [groupMatchesCount, setGroupMatchesCount] = useState(0);
  const [totalMatchesCount, setTotalMatchesCount] = useState(0);
  const [starsCount, setStarsCount] = useState<StarsCount>(0);
  // interval on mount -> useEffect []
  // read state inside set interval

  useEffect(createInterval, []);
  useEffect(updateStarsCount, [totalMatchesCount]);

  function onIconMatch(index: number, draggedName: TechName) {
    const { name } = sideIcons[index];

    const centerIcon = centerIcons.find((icon) => icon.name === name);

    if (centerIcon) {
      const isMatch = !centerIcon.isMatched && draggedName === name;

      if (!isMatch) {
        return;
      }
    }

    setTotalMatchesCount((total) => total + 1);
    matchCenterIcon(draggedName);
    matchSideIcon(draggedName);
    handleGroupProgression();
  }

  function matchCenterIcon(techName: TechName) {
    const centerIconsCopy = deepCopy(centerIcons);
    const icon = helpers.findIconByTechName(centerIconsCopy, techName);

    if (icon) {
      icon.isMatched = true;
      setCenterIcons(() => centerIconsCopy);
    }
  }

  function matchSideIcon(techName: TechName) {
    const sideIconsCopy = deepCopy(sideIcons);
    const icon = helpers.findIconByTechName(sideIconsCopy, techName);

    if (icon) {
      icon.isMatched = true;
      setSideIcons(() => sideIconsCopy);
    }
  }

  function handleGroupProgression() {
    const isGroupDone = groupMatchesCount === groupSize - 1;

    if (isGroupDone) {
      const newCenterIcons = helpers.createCenterIcons(level, groupSize);
      const newSideIcons = helpers.createSideIcons(newCenterIcons, level);

      setCenterIcons(() => newCenterIcons);
      setSideIcons(() => newSideIcons);
      setGroupMatchesCount(() => 0);
    } else {
      setGroupMatchesCount((count) => count + 1);
    }
  }

  function createInterval() {
    intervalId = setInterval(checkGameOver, 50);
  }

  function checkGameOver() {
    const newTimeLeft = gameDuration - (Date.now() - gameStartTime);
    setTimeLeft(() => newTimeLeft);

    // could not figure out a better way to make it work
    setTotalMatchesCount((totalMatches) => {
      const isGameOver = newTimeLeft < 0;

      if (isGameOver) {
        clearInterval(intervalId);
        onGameEnd(starsCount);
      }

      return totalMatches;
    });
  }

  function updateStarsCount() {
    const newStarsCount = helpers.getStars(totalMatchesCount);
    setStarsCount(newStarsCount);
  }

  return {
    onIconMatch,
    centerIcons,
    sideIcons,
    timeLeft,
    totalMatchesCount,
    starsCount,
  };
}

export default useAssessmentGame;
