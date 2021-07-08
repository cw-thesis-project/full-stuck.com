import React from 'react';
import { flipCounter } from 'assets/icons';
import styles from './FlipsCounter.module.scss';

interface Props {
  flipsLeft: number;
}

const FlipsCounter = ({ flipsLeft }: Props): JSX.Element => {
  return (
    <div className={styles.container} title="flips left">
      <img className={styles.flipIcon} alt="flip counter" src={flipCounter} />
      <h1 className={styles.flipsLeft}>{flipsLeft} </h1>
    </div>
  );
};

export default FlipsCounter;
