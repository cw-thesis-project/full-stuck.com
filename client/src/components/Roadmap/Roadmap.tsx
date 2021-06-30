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

  const display = levels.map((level, index) => {
    let levelStatus = '';

    if (levelToNumber[level] < levelToNumber[userLevel])
      levelStatus = styles.pastLevel;
    if (levelToNumber[level] === levelToNumber[userLevel])
      levelStatus = styles.currentLevel;
    if (levelToNumber[level] > levelToNumber[userLevel])
      levelStatus = styles.futureLevel;

    const containerStyle = {
      top: `${index * 5}em`,
    };

    return (
      <div
        className={`${levelStatus} ${styles.container}`}
        style={containerStyle}
      >
        <div className={styles.blob} />
        <div className={styles.levelText}>
          <h3>{level}</h3>
        </div>
      </div>
    );
  });

  const top = levelToNumber[userLevel];

  const secondLineStyle = {
    top: `${top * 3 + 1.5}em`,
    height: `${(4 - top) * 4.5}em`,
  };

  return (
    <div className={styles.column}>
      <div className={styles.verticalLine}>{`${' '}`}</div>
      <div
        className={styles.verticalLine2}
        style={secondLineStyle}
      >{`${' '}`}</div>
      {display}
    </div>
  );
};

export default Roadmap;
