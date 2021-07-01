/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SideColumn from '../../components/SideColumn';
import CenterBlob from '../../components/CenterBlob';
import CountDownBar from '../../components/CountDownBar';
import useAssessmentGame from './assessmentGame';
import styles from './Assessment.module.scss';
import { getIconDescriptors } from './helpers';
import { useAppDispatch, useAppSelector, actions } from '../../store';
import { AssessmentGameOptions } from './interfaces';

const Assessment = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.loading);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const options: AssessmentGameOptions = {
    level: 'junior',
    onGameEnd,
    techExperience: user?.gameData.techExperience,
  };

  const game = useAssessmentGame(options);

  useEffect(() => {
    if (!loading && game.round >= game.rounds) {
      // TODO: change points based on score
      dispatch(actions.setPointsToAssign(2));
      history.replace('/assign-points');
    }
  }, [loading, game.round]);

  function handleIconMatch(index: number) {
    const { name } = game.sidesGroup.icons[index];

    const centerIcon = game.centerGroup.icons.find(
      (icon) => icon.name === name
    );

    if (centerIcon && !centerIcon.isMatched) {
      console.log('matched', name);
      game.onIconMatch(name);
    } else {
      console.log(name, 'does not need to be clicked');
    }
  }

  function onGameEnd() {
    console.log('game ended');

    dispatch(
      actions.saveActivity({
        name: 'assessment',
        topic: 'git',
        stars: 3,
      })
    );
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
        <CenterBlob techNames={centerIcons} />
        <h2>
          {game.round}/{game.rounds}
        </h2>
        <CountDownBar currentPercentage={0.7} />
      </div>
      <SideColumn
        icons={rightIcons}
        onIconMatch={(index) => handleIconMatch(index + 5)}
      />
    </div>
  );
};

export default Assessment;
