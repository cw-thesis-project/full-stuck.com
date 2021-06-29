import React from 'react';
import { Level } from '../../shared/types';
import styles from './Roadmap.module.scss';

interface Props {
  userLevel: Level;
}

export type levelMap = Record<Level, number>;

const levelToNumber: levelMap = {
  junior: 1,
  senior: 2,
  tutor: 3,
  CEO: 4,
};

const Roadmap = ({ userLevel }: Props): JSX.Element => {
  const levels: Level[] = ['junior', 'senior', 'tutor', 'CEO'];

  const display = levels.map((level) => {
    let levelStatus = '';

    if (levelToNumber[level] < levelToNumber[userLevel])
      levelStatus = styles.pastLevel;
    if (levelToNumber[level] === levelToNumber[userLevel])
      levelStatus = styles.currentLevel;
    if (levelToNumber[level] > levelToNumber[userLevel])
      levelStatus = styles.futureLevel;

    return (
      <div className={`${levelStatus}`}>
        <div className={styles.blob} />
        <div className={`${styles.levelText}`}>
          <h3>{level}</h3>
        </div>
      </div>
    );
  });

  return <div>{display}</div>;
};

export default Roadmap;
