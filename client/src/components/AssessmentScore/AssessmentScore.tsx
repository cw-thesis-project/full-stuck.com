/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import classnames from 'classnames';
import styles from './AssessmentScore.module.scss';
import icons from '../../assets/icons';

interface Props {
  totalMatchesCount: number;
  minMatchesCount: number;
  stars: number;
}

const AssessmentScore = ({
  totalMatchesCount,
  minMatchesCount,
  stars,
}: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <StarsRow stars={stars} />
      <div className={styles.matchesContainer}>
        <h1 className={styles.totalMatches}>{totalMatchesCount}</h1>
        <h3 className={styles.minMatches}>/{minMatchesCount}</h3>
      </div>
    </div>
  );
};

const starsArray = [0, 1, 2];

interface StarsRowProps {
  stars: number;
}

const StarsRow = ({ stars }: StarsRowProps): JSX.Element => {
  return (
    <div className={styles.starsContainer}>
      {starsArray.map((number) => {
        const className = classnames({
          [styles.star]: true,
          [styles.gray]: stars <= number,
        });
        return <img alt="first star" className={className} src={icons.star} />;
      })}
    </div>
  );
};

export default AssessmentScore;
