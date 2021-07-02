/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideColumn from '../../components/SideColumn';
import CenterBlob from '../../components/CenterBlob';
import CountDownBar from '../../components/CountDownBar';
import useAssessmentGame from './assessmentGame';
import styles from './Assessment.module.scss';
import { getIconDescriptors, userAfterAssesment } from './helpers';
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
    level: 'junior',
    onGameEnd,
    techExperience: user?.gameData.techExperience,
  };

  const game = useAssessmentGame(options);

  function handleIconMatch(index: number) {
    const { name } = game.sidesGroup.icons[index];

    const centerIcon = game.centerGroup.icons.find(
      (icon) => icon.name === name
    );

    const isMatch = centerIcon && !centerIcon.isMatched && draggedName === name;

    if (isMatch) {
      game.onIconMatch(name);
    }
  }

  function onGameEnd() {
    if (!user) {
      return;
    }

    // TODO: make hasWon dynamic
    const hasWon = true;
    const newUser = userAfterAssesment(user, hasWon);
    // TODO: REPLACE POINTS TO ASSIGN
    // const pointsToAssign = hasWon ? 2 : 0;
    const pointsToAssign = 2;

    dispatch(updateUser(newUser));
    dispatch(actions.setPointsToAssign(pointsToAssign));

    history.replace('/assign-points');
  }

  if (!game.sidesGroup) {
    return <div>game won!</div>;
  }

  // prepare props for children
  const leftIcons = getIconDescriptors(game.sidesGroup.icons.slice(0, 5));
  const rightIcons = getIconDescriptors(game.sidesGroup.icons.slice(5));
  const centerIcons = game.centerGroup.icons
    .filter((icon) => !icon.isMatched)
    .map((icon) => icon.name);

  return (
    <div className={styles.page}>
      <SideColumn
        icons={leftIcons}
        onIconMatch={(index) => handleIconMatch(index)}
      />
      <div className={styles.centerSection}>
        <h1>{game.gameTime.toFixed(1)}s</h1>
        <CenterBlob
          techNames={centerIcons}
          onDragStart={(techName) => setDraggedName(techName)}
        />
        <div className={styles.roundsContainer}>
          <h2 className={styles.roundsDone}>{game.round}</h2>
          <h2 className={styles.totalRounds}>/{game.rounds}</h2>
        </div>
        <button type="button" onClick={onGameEnd}>
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
