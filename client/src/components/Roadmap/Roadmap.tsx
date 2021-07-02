import React from 'react';
import { Level } from '../../shared/types';
import styles from './Roadmap.module.scss';

interface Props {
  userLevel: Level;
}

export type levelMap = Record<Level, number>;

const levelToNumber: levelMap = {
  junior: 0,
  senior: 1,
  tutor: 2,
  CEO: 3,
};

const Roadmap = ({ userLevel }: Props): JSX.Element => {
  const levels: Level[] = ['junior', 'senior', 'tutor', 'CEO'];

  const display = levels.map((level, index) => {
    let levelStatus = '';

    if (levelToNumber[level] < levelToNumber[userLevel])
      levelStatus = styles.pastLevel;
    if (levelToNumber[level] === levelToNumber[userLevel])
      levelStatus = styles.currentLevel;
    if (levelToNumber[level] > levelToNumber[userLevel])
      levelStatus = styles.futureLevel;

    const containerStyle = {
      top: `${index * 4.5}em`,
    };

    return (
      <div
        className={`${levelStatus} ${styles.levelContainer}`}
        style={containerStyle}
      >
        <div className={styles.blob} />
        <div className={styles.levelText}>
          <h3>{level}</h3>
        </div>
      </div>
    );
  });

  const progress = levelToNumber[userLevel];

  const progressBarStyle = {
    top: `1.5em`,
    height: `${progress * 4.5}em`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.fullBar}>{`${' '}`}</div>
      <div
        className={styles.progressBar}
        style={progressBarStyle}
      >{`${' '}`}</div>
      {display}
    </div>
  );
};

export default Roadmap;
