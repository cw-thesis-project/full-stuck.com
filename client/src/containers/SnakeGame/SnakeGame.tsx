import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './SnakeGame.module.scss';
import { actions, useAppDispatch } from '../../store';
import SnakeBoard from '../../components/SnakeBoard/SnakeBoard';
import useSnakeGame from './useSnakeGame';

const SnakeGame = (): JSX.Element => {
  const {
    start,
    stop,
    isGameOver,
    score,
    board,
    block,
    handleKeyDown,
    snake,
    apple,
  } = useSnakeGame();

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    start();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stop();
    };
  }, []);

  function afterGameOver() {
    const hasWon = score >= 20;
    if (hasWon) {
      dispatch(actions.setPointsToAssign(1));
    }

    dispatch(
      actions.saveActivity({
        name: 'snake',
        topic: 'git',
        stars: hasWon ? 0 : 3,
      })
    );

    history.replace('/assign-points');
  }

  function checkIfGameOver() {
    if (isGameOver) {
      afterGameOver();
    }
  }

  useEffect(checkIfGameOver, [isGameOver]);

  return (
    <div className={styles.screen}>
      <SnakeBoard board={board} block={block} snake={snake} apple={apple} />
    </div>
  );
};

export default SnakeGame;
