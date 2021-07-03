/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideColumn from '../../components/SideColumn';
import CenterBlob from '../../components/CenterBlob';
import CountDownBar from '../../components/CountDownBar';
import useAssessmentGame from './assessmentGame';
import styles from './Assessment.module.scss';
import { userAfterAssesment } from './helpers';
import { useAppDispatch, useAppSelector, actions } from '../../store';
import { updateUser } from '../../store/thunks';
import { AssessmentGameOptions } from './interfaces';
import { TechName } from '../../shared/types';

const Assessment = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [draggedName, setDraggedName] = useState<TechName>('javascript');

  const options: AssessmentGameOptions = {
    level: user?.gameData.level || 'junior',
    onGameEnd,
    gameStartTime: Date.now(),
  };

  const game = useAssessmentGame(options);

  function handleIconMatch(index: number) {
    game.onIconMatch(index, draggedName);
  }

  function onGameEnd(starsCount: number) {
    if (!user) {
      return;
    }

    const hasWon = starsCount > 0;
    const newUser = userAfterAssesment(user, hasWon);
    const pointsToAssign = starsCount;

    dispatch(updateUser(newUser));
    dispatch(actions.setPointsToAssign(pointsToAssign));

    history.replace('/assign-points');
  }

  if (game.timeLeft < 0) {
    return <div style={{ color: 'red' }}>game over!</div>;
  }

  // prepare props for children
  const leftIcons = game.sideIcons.slice(0, 5);
  const rightIcons = game.sideIcons.slice(5);
  const centerNames = game.centerIcons
    .filter((icon) => !icon.isMatched)
    .map((icon) => icon.name);

  return (
    <div className={styles.page}>
      <SideColumn
        icons={leftIcons}
        onIconMatch={(index) => handleIconMatch(index)}
      />
      <div className={styles.centerSection}>
        <h1>{(game.timeLeft / 1000).toFixed(1)}s</h1>
        <CenterBlob
          techNames={centerNames}
          onDragStart={(techName) => setDraggedName(techName)}
        />
        <div className={styles.roundsContainer}>
          <h2 className={styles.roundsDone}>{game.totalMatchesCount}</h2>
        </div>
        <button type="button" onClick={() => onGameEnd(3)}>
          <CountDownBar currentPercentage={0.7} />
        </button>
      </div>
      <SideColumn
        icons={rightIcons}
        onIconMatch={(index) => handleIconMatch(index + 5)}
      />
    </div>
  );
};

export default Assessment;
