import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './CurrentScheduleCard.module.scss';
import icons from '../../assets/icons';
import { Activity } from '../../shared/types';
import StarsRow from '../StarsRow';

interface Props {
  nextActivity: Activity;
  className: string;
}

const CurrentScheduleCard = ({
  nextActivity,
  className,
}: Props): JSX.Element => {
  return (
    <div className={`${styles.card} ${className}`}>
      <ScheduleItemHeader topic="null" variant="accent" />
      <div className={styles.centerContainer}>
        <div style={{ opacity: 0 }}>
          <StarsRow starsCount={0} />
        </div>
        <div className={styles.imageContainer}>
          <img src={icons.graduationHat} alt="graduation hat" />
        </div>
      </div>
      <p className={styles.quote}>Are you ready to learn a new tech?</p>
      <Link className={styles.ribbon} to={`/game/${nextActivity}`}>
        <p>Study!</p>
      </Link>
    </div>
  );
};

export default CurrentScheduleCard;
