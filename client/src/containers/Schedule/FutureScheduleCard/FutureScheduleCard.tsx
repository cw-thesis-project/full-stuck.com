/* eslint-disable import/no-unresolved */
import React from 'react';
import { questionLogo } from 'assets/icons';
import StarsRow from 'components/StarsRow';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './FutureScheduleCard.module.scss';

interface Props {
  className: string;
}

const FutureScheduleCard = ({ className }: Props): JSX.Element => {
  return (
    <div className={`${styles.scheduleItem} ${className}`}>
      <ScheduleItemHeader topic="<any>" variant="disabled" />
      <div className={styles.centerContainer}>
        <div style={{ opacity: 0 }}>
          <StarsRow starsCount={0} />
        </div>
        <div className={styles.iconContainer}>
          <img src={questionLogo} alt="question icon" />
        </div>
      </div>
      <p className={styles.quote}>What will the future bring?</p>
      <div className={styles.ribbon}>
        <p>Unknown</p>
      </div>
    </div>
  );
};

export default FutureScheduleCard;
