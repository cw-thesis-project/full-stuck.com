import React from 'react';
import { Level } from '../../shared/types';
import { levelToNumber } from '../../shared/constants';
import styles from './Roadmap.module.scss';

interface Props {
  userLevel: Level;
}

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

  return (
    <div className={styles.container}>
      <div className={styles.fullBar}>{`${' '}`}</div>
      {display}
    </div>
  );
};

export default Roadmap;
