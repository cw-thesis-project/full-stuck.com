/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import classNames from 'classnames';
import SideColumn from '../../components/SideColumn';
import CenterIcons from '../../components/CenterIcons';
import AssessmentScore from '../../components/AssessmentScore';
import GameOver from '../../components/GameOver';
import useAssessmentGame from './useAssessmentGame';
import styles from './Assessment.module.scss';
import { userAfterAssessment } from './helpers';
import { useAppDispatch, useAppSelector, actions } from '../../store';
import { updateUser } from '../../store/thunks';
import { AssessmentGameOptions } from './interfaces';
import { StarsCount, TechName } from '../../shared/types';
import icons from '../../assets/icons';
import usePageTitle from '../../shared/usePageTitle';
import AssessmentBackground from '../../components/AssessmentBackground';
import useAssessmentAnimations from './useAssessmentAnimations';

const Assessment = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [draggedName, setDraggedName] = useState<TechName>('javascript');
  const [isDragging, setIsDragging] = useState(false);
  const [wasCheatUsed, setWasCheatUsed] = useState(false);

  const options: AssessmentGameOptions = {
    level: user?.gameData.level || 'junior',
    onGameEnd,
  };

  const { gameState, onIconMatch } = useAssessmentGame(options);
  usePageTitle('Assessment — Full Stuck');
  useAssessmentAnimations(gameState.totalMatchesCount);

  function handleIconMatch(index: number) {
    setIsDragging(false);
    onIconMatch(index, draggedName);
  }

  function onGameEnd(starsCount: StarsCount) {
    if (!user) {
      return;
    }

    const newUser = userAfterAssessment(user, starsCount);

    dispatch(updateUser(newUser));
    dispatch(actions.setPointsToAssign(starsCount));
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleDragStart(techName: TechName) {
    setDraggedName(techName);
    setIsDragging(true);
  }

  function handleCheat() {
    setWasCheatUsed(true);
    onGameEnd(2);
  }

  // prepare props for children
  const leftIcons = gameState.sideIcons.slice(0, 5);
  const rightIcons = gameState.sideIcons.slice(5);
  const centerNames = gameState.centerIcons
    .filter((icon) => !icon.isMatched)
    .map((icon) => icon.name);

  const centerContainer = classNames({
    [styles.centerIconsContainer]: true,
    [styles.centerDark]: isDragging,
  });

  const showGameOver = gameState.isOver || wasCheatUsed;
  const starsNumber = wasCheatUsed ? 2 : gameState.starsCount;

  if (gameState.timeLeft < 0) {
    return <GameOver starsCount={starsNumber} showStars />;
  }

  return (
    <div className={styles.page}>
      {showGameOver && <GameOver starsCount={starsNumber} showStars />}
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
          <h1 title="time left" className={styles.timeLeft}>
            {(gameState.timeLeft / 1000).toFixed(1)}s
          </h1>
        </div>
        <div className={styles.circleContainer}>
          <div className={centerContainer}>
            <CenterIcons
              techNames={centerNames}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              isDragging={isDragging}
            />
            <button
              className={styles.cheatButton}
              type="button"
              onClick={handleCheat}
              title="cheat!"
            >
              <AssessmentScore
                totalMatchesCount={gameState.totalMatchesCount}
                starsCount={gameState.starsCount}
                minMatchesCount={15}
              />
            </button>
          </div>
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
