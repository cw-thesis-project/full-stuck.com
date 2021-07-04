import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './SnakeGame.module.scss';
import { actions, useAppDispatch } from '../../store';
import Snake from '../../components/Snake/Snake';

const SnakeGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  function afterGameOver(hasWon: boolean) {
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
    if (false) {
      afterGameOver(false);
    }
  }

  useEffect(checkIfGameOver, []);

  return (
    <div className={styles.screen}>
      <Snake />
    </div>
  );
};

export default SnakeGame;
