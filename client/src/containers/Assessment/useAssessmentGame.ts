/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import { TechName } from '../../shared/types';
import { deepCopy } from '../../shared/utils';
import {
  AssesmentGameState,
  AssessmentGameOptions,
  IAssessmentGame,
  Icon,
} from './interfaces';
import * as helpers from './helpers';

function useAssessmentGame(
  gameOptions: AssessmentGameOptions
): IAssessmentGame {
  const { level, onGameEnd } = gameOptions;

  // game constants
  const groupSize = 3;
  const gameDuration = 200_000;

  const initialCenterIcons = helpers.createCenterIcons(level, groupSize);
  const initialSideIcons = helpers.createSideIcons(initialCenterIcons, level);

  let intervalId: NodeJS.Timeout;

  const [gameState, setGameState] = useState<AssesmentGameState>({
    centerIcons: initialCenterIcons,
    sideIcons: initialSideIcons,
    groupMatchesCount: 0,
    starsCount: 0,
    timeLeft: gameDuration,
    totalMatchesCount: 0,
    isOver: false,
  });

  useEffect(() => {
    const clock = 50;
    intervalId = setInterval(() => {
      setGameState((state) => {
        const isGameOver = state.timeLeft < 0;

        if (!state.isOver && isGameOver) {
          clearInterval(intervalId);
          onGameEnd(state.starsCount);
        }

        return {
          ...state,
          timeLeft: state.timeLeft - clock,
          isOver: state.isOver || isGameOver,
        };
      });
    }, clock);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function onIconMatch(index: number, draggedName: TechName) {
    const { name } = gameState.sideIcons[index];

    const centerIcon = gameState.centerIcons.find((icon) => icon.name === name);

    if (centerIcon) {
      const isMatch = !centerIcon.isMatched && draggedName === name;

      if (!isMatch) {
        return;
      }
    }

    setGameState((state) => {
      const centerIcons = matchCenterIcon(state, draggedName);
      const sideIcons = matchSideIcon(state, draggedName);

      const newPartOfState: AssesmentGameState = {
        ...state,
        totalMatchesCount: state.totalMatchesCount + 1,
        centerIcons,
        sideIcons,
        starsCount: helpers.getStars(state.totalMatchesCount + 1),
      };

      const rest = handleGroupProgression(newPartOfState);

      return {
        ...newPartOfState,
        ...rest,
      };
    });
  }

  function matchCenterIcon(
    state: AssesmentGameState,
    techName: TechName
  ): Icon[] {
    const centerIconsCopy = deepCopy(state.centerIcons);
    const icon = helpers.findIconByTechName(centerIconsCopy, techName);

    if (icon) {
      icon.isMatched = true;
    }

    return centerIconsCopy;
  }

  function matchSideIcon(
    state: AssesmentGameState,
    techName: TechName
  ): Icon[] {
    const sideIconsCopy = deepCopy(state.sideIcons);
    const icon = helpers.findIconByTechName(sideIconsCopy, techName);

    if (icon) {
      icon.isMatched = true;
    }

    return sideIconsCopy;
  }

  function handleGroupProgression(
    state: AssesmentGameState
  ): Partial<AssesmentGameState> {
    const isGroupDone = state.groupMatchesCount === groupSize - 1;
    let newCenterIcons = state.centerIcons;
    let newSideIcons = state.sideIcons;
    let newGroupMatchesCount = state.groupMatchesCount;

    if (isGroupDone) {
      newCenterIcons = helpers.createCenterIcons(level, groupSize);
      newSideIcons = helpers.createSideIcons(newCenterIcons, level);
      newGroupMatchesCount = 0;
    } else {
      newGroupMatchesCount += 1;
    }

    return {
      centerIcons: newCenterIcons,
      sideIcons: newSideIcons,
      groupMatchesCount: newGroupMatchesCount,
    };
  }

  return { onIconMatch, gameState };
}

export default useAssessmentGame;
