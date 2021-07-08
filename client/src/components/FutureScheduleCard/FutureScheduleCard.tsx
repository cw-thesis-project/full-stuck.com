import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './FutureScheduleCard.module.scss';
import icons from '../../assets/icons';
import StarsRow from '../StarsRow';

interface Props {
  className: string;
}

const FutureScheduleCard = ({ className }: Props): JSX.Element => {
  return (
    <Link to="/game/snake" className={`${styles.scheduleItem} ${className}`}>
      <ScheduleItemHeader topic="<any>" variant="disabled" />
      <div className={styles.centerContainer}>
        <div style={{ opacity: 0 }}>
          <StarsRow starsCount={0} />
        </div>
        <div className={styles.iconContainer}>
          <img src={icons.questionLogo} alt="question icon" />
        </div>
      </div>
      <p className={styles.quote}>What will the future bring?</p>
      <div className={styles.ribbon}>
        <p>Unknown</p>
      </div>
    </Link>
  );
};

export default FutureScheduleCard;
