/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { TechName } from '../../shared/types';
import useElapsedTime from '../../shared/useElapsedTime';
import { deepCopy } from '../../utils/utils';
import { AssessmentGameOptions, IAssessmentGame } from './interfaces';
import * as helpers from './helpers';

function useAssessmentGame(
  gameOptions: AssessmentGameOptions
): IAssessmentGame {
  const { level, onGameEnd, techExperience } = gameOptions;

  let userExperience = helpers.mockTechExperience;

  if (techExperience) {
    // TODO: create cards based on tech experience
    userExperience = techExperience;
  }

  // game constants
  const groupSize = 3;
  const rounds = 2;
  const maxTimeForGroup = 5;

  const atCenter = helpers.createIconsToDrag(level, groupSize, rounds);
  const atSides = helpers.createSideChoices(atCenter);

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
    const icon = helpers.findIconByTechName(toDragCopy[round].icons, techName);

    if (icon) {
      icon.isMatched = true;
      setGroupsToDrag(toDragCopy);
    }
  }

  function matchSideIcon(techName: TechName) {
    const sideCopy = deepCopy(sideChoices);
    const icon = helpers.findIconByTechName(sideCopy[round].icons, techName);

    if (icon) {
      icon.isMatched = true;
      setSideChoices(sideCopy);
    }
  }

  function handleRoundProgression() {
    const isRoundDone = matched === groupSize - 1;

    if (isRoundDone) {
      if (round < rounds - 1) {
        setMatched(0);
      } else {
        onGameEnd(3);
      }
      setRound((r) => r + 1);
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

export default useAssessmentGame;
