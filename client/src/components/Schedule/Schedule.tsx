import React from 'react';
import { PastActivity } from '../../shared/types';
import FutureScheduleCard from '../FutureScheduleCard';
import CurrentScheduleCard from '../CurrentScheduleCard';
import PastScheduleCard from '../PastScheduleCard';
import CalendarDate from '../CalendarDate';
import styles from './Schedule.module.scss';
import { completedWeek } from './mock';

interface Props {
  history: PastActivity[];
}

// converts user stars into a boolean
const isFailed = (stars: number): boolean => {
  if (!stars) return true;
  return false;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Schedule = ({ history }: Props) => {
  return (
    <div className={styles.scheduleList}>
      <CalendarDate variant="current" dayIndex={1} />
      <PastScheduleCard isFailed stars={3} topic="javascript" />
      <PastScheduleCard isFailed={false} stars={1} topic="react" />
      <CurrentScheduleCard />
      <FutureScheduleCard />
      <div>
        <img src="" alt="study icon" />
        <p>Study Now</p>
      </div>
    </div>
  );
};

export default Schedule;
