import React from 'react';
import { Level } from '../../shared/types';
import styles from './NextLevelCard.module.scss';
import icons from '../../assets/icons';

interface Props {
  level: Level;
}

const NextLevel = ({ level }: Props): JSX.Element => {
  const previousLevel: Level = level === 'tutor' ? 'senior' : 'junior';
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{level}</h2>
      </div>
      <div className={styles.lockedZone}>
        <img src={icons.lock} alt="medal" className={styles.img} />
        <h3>locked</h3>
      </div>
      <div className={styles.bottom}>
        <h4>You must complete the {previousLevel} part first!</h4>
      </div>
    </div>
  );
};

export default NextLevel;
