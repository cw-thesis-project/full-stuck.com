import React from 'react';
import styles from './ScheduleItemHeader.module.scss';

interface Props {
  scheduleItemTopic: string;
}

const ScheduleItemHeader = ({ scheduleItemTopic }: Props): JSX.Element => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerColor} />
      <h1 className={styles.topic}>{scheduleItemTopic}</h1>
    </div>
  );
};

export default ScheduleItemHeader;
