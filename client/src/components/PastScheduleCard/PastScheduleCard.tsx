import React from 'react';
import { StarsCount, TechName } from '../../shared/types';
import TechIcon from '../TechIcon';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './PastScheduleCard.module.scss';
import icons from '../../assets/icons';

interface Props {
  stars: StarsCount;
  topic: TechName;
}
const PastScheduleCard = ({ stars, topic }: Props): JSX.Element => {
  const starsArray = [0, 1, 2];

  if (!stars) {
    return (
      <div className={styles.card}>
        <ScheduleItemHeader topic="Test" />
        <img className={styles.sadFace} src={icons.sadFace} alt="sad face" />
        <p className={styles.paragraph}>Maybe you’ll get it right next time!</p>
        <div className={`${styles.ribbon} ${styles.failed}`}>Failed</div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <ScheduleItemHeader topic={topic} />
      <div className={styles.starsRow}>
        {starsArray.map((index) => (
          <img
            className={index >= stars ? styles.grayStar : ''}
            src={icons.star}
            alt="star"
            key={index}
          />
        ))}
      </div>
      <TechIcon techName={topic} iconSize="large" isGray={false} />
      <p className={styles.paragraph}>You did great, keep on going!</p>
      <div className={styles.ribbon}>Learnt</div>
    </div>
  );
};

export default PastScheduleCard;
