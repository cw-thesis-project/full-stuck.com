import React from 'react';
import { StarsCount, TechName } from '../../shared/types';
import TechIcon from '../TechIcon';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './PastScheduleCard.module.scss';
import icons from '../../assets/icons';
import StarsRow from '../StarsRow';

interface Props {
  stars: StarsCount;
  topic: TechName;
  className: string;
}
const PastScheduleCard = ({ stars, topic, className }: Props): JSX.Element => {
  if (!stars) {
    return (
      <div className={`${styles.card} ${className}`}>
        <ScheduleItemHeader topic="Test" variant="disabled" />
        <div className={styles.centerContainer}>
          <StarsRow starsCount={0} />
          <img className={styles.sadFace} src={icons.sadFace} alt="sad face" />
        </div>
        <p className={styles.paragraph}>Maybe you’ll get it right next time!</p>
        <div className={`${styles.ribbon} ${styles.failed}`}>
          <p>Failed</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${className}`}>
      <ScheduleItemHeader topic={topic} variant="primary" />
      <div className={styles.centerContainer}>
        <StarsRow starsCount={stars} />
        <TechIcon techName={topic} iconSize="large" isGray={false} />
      </div>
      <p className={styles.paragraph}>You did great, keep on going!</p>
      <div className={styles.ribbon}>
        <p>Learnt</p>
      </div>
    </div>
  );
};

export default PastScheduleCard;
