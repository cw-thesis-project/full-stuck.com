/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Activity, PastActivity } from 'shared/types';
import FutureScheduleCard from '../FutureScheduleCard';
import CurrentScheduleCard from '../CurrentScheduleCard';
import PastScheduleCard from '../PastScheduleCard';
import CalendarDate from '../CalendarDate';
import getDateVariant from './helperFunctions';
import styles from './Schedule.module.scss';

interface Props {
  history: PastActivity[];
  nextActivity: Activity;
  historyLength: number;
}

const Schedule = ({
  history,
  nextActivity,
  historyLength,
}: Props): JSX.Element => {
  const futureCards: number[] = [];
  futureCards.length = 5 - history.length;
  futureCards.fill(0);

  const daysIndexes = [0, 1, 2, 3, 4, 5];
  const quotient = Math.floor(historyLength / 6);

  return (
    <div className={styles.container}>
      {daysIndexes.map((index) => (
        <CalendarDate
          variant={getDateVariant(index, history.length)}
          activityIndex={quotient * 6 + 1 + index}
          dayIndex={index}
          key={index}
        />
      ))}

      {history.map((pastActivity, index) => (
        <PastScheduleCard
          key={index}
          stars={pastActivity.stars}
          topic={pastActivity.topic}
          className={styles.scheduleCard}
        />
      ))}
      <CurrentScheduleCard
        nextActivity={nextActivity}
        className={styles.scheduleCard}
      />
      {futureCards.map((_, index) => (
        <FutureScheduleCard className={styles.scheduleCard} key={index} />
      ))}
    </div>
  );
};

export default Schedule;
