/* eslint-disable import/no-unresolved */
import React from 'react';
import { StarsCount } from 'shared/types';
import { StarsRow } from 'components';
import styles from './AssessmentScore.module.scss';

interface Props {
  totalMatchesCount: number;
  minMatchesCount: number;
  starsCount: StarsCount;
}

const AssessmentScore = ({
  totalMatchesCount,
  minMatchesCount,
  starsCount,
}: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <StarsRow starsCount={starsCount} />
      <div className={styles.matchesContainer}>
        <h1 className={styles.totalMatches}>{totalMatchesCount}</h1>
        <h3 className={styles.minMatches}>/{minMatchesCount}</h3>
      </div>
    </div>
  );
};

export default AssessmentScore;
