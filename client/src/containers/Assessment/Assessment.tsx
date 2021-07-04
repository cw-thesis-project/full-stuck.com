/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import SideColumn from '../../components/SideColumn';
import CenterIcons from '../../components/CenterIcons';
import AssessmentScore from '../../components/AssessmentScore';
import useAssessmentGame from './assessmentGame';
import styles from './Assessment.module.scss';
import { userAfterAssessment } from './helpers';
import { useAppDispatch, useAppSelector, actions } from '../../store';
import { updateUser } from '../../store/thunks';
import { AssessmentGameOptions } from './interfaces';
import { StarsCount, TechName } from '../../shared/types';
import icons from '../../assets/icons';
import usePageTitle from '../../shared/usePageTitle';
import AssessmentBackground from '../../components/AssessmentBackground';

const Assessment = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [draggedName, setDraggedName] = useState<TechName>('javascript');
  const [isDragging, setIsDragging] = useState(false);

  const options: AssessmentGameOptions = {
    level: user?.gameData.level || 'junior',
    onGameEnd,
    gameStartTime: Date.now(),
  };

  const game = useAssessmentGame(options);
  usePageTitle('Assessment — Full Stuck');

  function handleIconMatch(index: number) {
    setIsDragging(false);
    game.onIconMatch(index, draggedName);
  }

  function onGameEnd(starsCount: StarsCount) {
    if (!user) {
      return;
    }

    const newUser = userAfterAssessment(user, starsCount);

    dispatch(updateUser(newUser));
    dispatch(actions.setPointsToAssign(starsCount));

    history.replace('/assign-points');
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleDragStart(techName: TechName) {
    setDraggedName(techName);
    setIsDragging(true);
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

  const centerContainer = classNames({
    [styles.centerIconsContainer]: true,
    [styles.centerDark]: isDragging,
  });

  return (
    <div className={styles.page}>
      <AssessmentBackground isDragging={isDragging} />
      <SideColumn
        variant="left"
        icons={leftIcons}
        onIconMatch={(index) => handleIconMatch(index)}
      />
      <div className={styles.centerSection}>
        <div className={styles.header}>
          <img
            alt="hourglass icon"
            className={styles.hourGlassIcon}
            src={icons.hourGlassLogo}
          />
          <h1 className={styles.timeLeft}>
            {(game.timeLeft / 1000).toFixed(1)}s
          </h1>
        </div>
        <div className={centerContainer}>
          <CenterIcons
            techNames={centerNames}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
          <button
            className={styles.cheatButton}
            type="button"
            onClick={() => onGameEnd(3)}
          >
            <AssessmentScore
              totalMatchesCount={game.totalMatchesCount}
              starsCount={game.starsCount}
              minMatchesCount={15}
            />
          </button>
        </div>
        <h2 className={styles.helperText}>Drag the icons!</h2>
      </div>
      <SideColumn
        variant="right"
        icons={rightIcons}
        onIconMatch={(index) => handleIconMatch(index + 5)}
      />
    </div>
  );
};

export default Assessment;
