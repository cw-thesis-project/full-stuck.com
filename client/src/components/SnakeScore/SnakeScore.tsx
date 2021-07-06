import React from 'react';
import styles from './SnakeScore.module.scss';

interface Props {
  score: number;
  targetScore: number;
}

const SnakeScore = ({ score, targetScore }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.textRow}>
        <h1 className={styles.flipsDone}>{score} </h1>
        <h2 className={styles.allowedFlips}>/ {targetScore}</h2>
      </div>
    </div>
  );
};

export default SnakeScore;
