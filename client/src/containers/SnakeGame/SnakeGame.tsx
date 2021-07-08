/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { TechName } from 'shared/types';
import { pickRandomTopic } from 'shared/utils';
import { actions, useAppDispatch } from 'store';
import { GameOver } from 'components';
import styles from './SnakeGame.module.scss';
import SnakeBoard from './SnakeBoard/SnakeBoard';

const SnakeGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [points, setPoints] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const targetScore = 16;

  function checkIfGameOver() {
    if (isGameOver) {
      let topic: TechName = 'git';

      if (!hasWon) {
        topic = pickRandomTopic();
      }

      dispatch(
        actions.saveActivity({
          name: 'snake',
          topic,
          stars: hasWon ? 3 : 0,
        })
      );
    }
  }

  function checkIfWon() {
    if (points >= targetScore) {
      dispatch(actions.setPointsToAssign(1));
      setHasWon(true);
      setIsGameOver(true);
    }
  }

  useEffect(checkIfWon, [points]);
  useEffect(checkIfGameOver, [isGameOver]);

  return (
    <div className={styles.screen}>
      {isGameOver && <GameOver starsCount={points >= targetScore ? 3 : 0} />}
      <div className={styles.snakeBoardContainer}>
        <SnakeBoard
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          points={points}
          setPoints={setPoints}
        />
      </div>
      <div className={styles.rightSide}>
        <h1 className={styles.sadFace}>:(</h1>
        <p className={styles.subtitle}>
          Your code ran into problems, are you missing a bracket?
        </p>
        <p className={styles.subtitle}>
          {Math.floor((points / targetScore) * 100)}% BUGS_FIXED
        </p>
        <div className={styles.footer}>
          <p>
            For more informations about this issue and possible fixes, visit
          </p>
          <p>https://tools.codeworks.me/#/help-request</p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
