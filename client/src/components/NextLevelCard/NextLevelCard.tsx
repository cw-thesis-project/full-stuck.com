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
    <button type="button" className={styles.container}>
      <h2 className={styles.title}>{level}</h2>
      <img src={icons.lock} alt="medal" className={styles.lockIcon} />
      <h3 className={styles.cardStatus}>locked</h3>
      <p className={styles.textBottom}>
        Complete the {previousLevel} part first!
      </p>
    </button>
  );
};

export default NextLevel;
