import React from 'react';
import styles from './FlipsCounter.module.scss';
import icons from '../../assets/icons';

interface Props {
  flipsDone: number;
  allowedFlips: number;
}

const FlipsCounter = ({ flipsDone, allowedFlips }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <img className={styles.icon} alt="flip counter" src={icons.flipCounter} />
      <div className={styles.textRow}>
        <h1 className={styles.flipsDone}>{flipsDone} </h1>
        <h2 className={styles.allowedFlips}>/ {allowedFlips}</h2>
      </div>
    </div>
  );
};

export default FlipsCounter;
