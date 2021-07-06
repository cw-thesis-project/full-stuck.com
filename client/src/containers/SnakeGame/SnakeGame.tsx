import React, { useEffect, useState } from 'react';
import styles from './SnakeGame.module.scss';
import { actions, useAppDispatch } from '../../store';
import SnakeBoard from '../../components/SnakeBoard/SnakeBoard';
import SnakeScore from '../../components/SnakeScore/SnakeScore';
import GameOver from '../../components/GameOver/GameOver';

const SnakeGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [points, setPoints] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const targetScore = 16;

  function checkIfGameOver() {
    if (isGameOver) {
      dispatch(
        actions.saveActivity({
          name: 'snake',
          topic: 'git',
          stars: hasWon ? 0 : 3,
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
      {isGameOver ? <GameOver hasWon={hasWon} /> : null}
      <SnakeScore score={points} targetScore={targetScore} />
      <SnakeBoard
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
        points={points}
        setPoints={setPoints}
      />
    </div>
  );
};

export default SnakeGame;
