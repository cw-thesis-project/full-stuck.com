import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GameOver.module.scss';

const GameOver = ({ hasWon }: { hasWon: boolean }): JSX.Element => {
  return (
    <div className={styles.container}>
      {hasWon ? (
        <div>Congratulations! you won!</div>
      ) : (
        <div>Almost there! Keep trying!</div>
      )}
      <Link to="/assign-points">
        <button type="button">check your points</button>
      </Link>
    </div>
  );
};

export default GameOver;
