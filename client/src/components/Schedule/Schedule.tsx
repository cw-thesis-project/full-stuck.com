import React from 'react';
import { PastActivity } from '../../shared/types';
import FutureScheduleCard from '../FutureScheduleCard';
import CurrentScheduleCard from '../CurrentScheduleCard';
import PastScheduleCard from '../PastScheduleCard';
import CalendarDate, { DateVariant } from '../CalendarDate';
import styles from './Schedule.module.scss';

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
  const futureCards: number[] = [];
  futureCards.length = 5 - history.length;
  futureCards.fill(0);

  const dates = [0, 1, 2, 3, 4, 5];

  return (
    <div className={styles.scheduleList}>
      {dates.map((date) => {
        let variant: DateVariant = 'past';
        if (date === history.length) {
          variant = 'current';
        } else if (date > history.length) {
          variant = 'future';
        }
        return <CalendarDate variant={variant} dayIndex={date} />;
      })}

      {history.map((pastActivity) => (
        <PastScheduleCard
          stars={pastActivity.stars}
          topic={pastActivity.topic}
        />
      ))}
      <div>
        <img src="" alt="study icon" />
        <p>Study Now</p>
      </div>
      <CurrentScheduleCard />
      {futureCards.map(() => (
        <FutureScheduleCard />
      ))}
    </div>
  );
};

export default Schedule;
