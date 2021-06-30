import React from 'react';
import { Level } from '../../shared/types';
import styles from './CompletedLevelCard.module.scss';
import icons from '../../assets/icons';

interface Props {
  level: Level;
}

const CompletedLevelCard = ({ level }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <h2>{level}</h2>
      <div className={styles.medalZone}>
        <img src={icons.medal} alt="medal" className={styles.img} />
        <h3>Completed</h3>
      </div>
      <div className={styles.bottom}>
        <h4>Be proud of yourself!</h4>
        <h4>This was not easy</h4>
      </div>
    </div>
  );
};

export default CompletedLevelCard;
