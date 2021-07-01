import React from 'react';
import TechIcon from '../TechIcon';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './FutureScheduleCard.module.scss';

const FutureScheduleCard = (): JSX.Element => {
  return (
    <div className={styles.scheduleItem}>
      <ScheduleItemHeader scheduleItemTopic="undefined" />
      <div className={styles.iconContainer}>
        <TechIcon techName="javascript" iconSize="large" isGray isLocked />
      </div>
      <p className={styles.quote}>Who knows what the future will bring</p>
    </div>
  );
};

export default FutureScheduleCard;
