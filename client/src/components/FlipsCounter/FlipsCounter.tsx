import React from 'react';
import styles from './FlipsCounter.module.scss';
import icons from '../../assets/icons';
import useMemoryGame from '../../containers/MemoryGame/useMemoryGame';

const FlipsCounter = (): JSX.Element => {
  const { flipsDone, allowedFlips } = useMemoryGame();

  return (
    <div className={styles.container}>
      <img
        className={styles.flipCounter}
        src={icons.flipCounter}
        alt="flipCounter"
      />

      <h1 className={styles.flipsDone}>{flipsDone}</h1>
      <h2 className={styles.allowedFlips}>/ {allowedFlips}</h2>
    </div>
  );
};

export default FlipsCounter;
