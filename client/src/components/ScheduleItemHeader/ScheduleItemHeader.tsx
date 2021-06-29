import React from 'react';
import { TechName } from '../../shared/types';
import PastScheduleCard from '../PastScheduleCard/PastScheduleCard';
import styles from './ScheduleItemHeader.module.scss';

interface Props {
  scheduleItemTopic: string;
}

const ScheduleItemHeader = ({ scheduleItemTopic }: Props) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerColor} />
      <h1>{scheduleItemTopic}</h1>
    </div>
  );
};

export default ScheduleItemHeader;
