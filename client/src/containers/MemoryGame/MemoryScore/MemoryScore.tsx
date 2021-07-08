/* eslint-disable import/no-unresolved */
import React from 'react';
import { StarsCount } from 'shared/types';
import StarsRow from 'components/StarsRow';
import styles from './MemoryScore.module.scss';

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
    <button
      type="button"
      className={styles.container}
      onClick={onClick}
      title="cheat!"
    >
      <StarsRow starsCount={starsCount} />
      <div className={styles.matchesContainer}>
        <h2 className={styles.matchesDone}>{numberOfMatches}</h2>
        <h3 className={styles.matchesTotal}>/9</h3>
      </div>
      <h3 className={styles.matchedText}>Matched</h3>
    </button>
  );
};

export default MemoryScore;
