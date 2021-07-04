/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './MemoryScore.module.scss';
import { StarsCount } from '../../shared/types';
import StarsRow from '../StarsRow';

interface Props {
  numberOfMatches: number;
  starsCount: StarsCount;
  onClick(): void;
}

const MemoryScore = ({
  numberOfMatches,
  starsCount,
  onClick,
}: Props): JSX.Element => {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      <StarsRow starsCount={starsCount} />
      <div className={styles.matchesContainer}>
        <h2 className={styles.matchesDone}>{numberOfMatches}</h2>
        <h3 className={styles.matchesTotal}>/9</h3>
      </div>
      <h3>Matched</h3>
    </button>
  );
};

export default MemoryScore;
