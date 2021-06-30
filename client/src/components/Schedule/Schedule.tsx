import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, PastActivity } from '../../shared/types';
import FutureScheduleCard from '../FutureScheduleCard';
import CurrentScheduleCard from '../CurrentScheduleCard';
import PastScheduleCard from '../PastScheduleCard';
import CalendarDate, { DateVariant } from '../CalendarDate';
import styles from './Schedule.module.scss';

interface Props {
  history: PastActivity[];
  nextActivity: Activity;
}

const Schedule = ({ history, nextActivity }: Props): JSX.Element => {
  const futureCards: number[] = [];
  futureCards.length = 5 - history.length;
  futureCards.fill(0);

  const daysIndexes = [0, 1, 2, 3, 4, 5];

  return (
    <div className={styles.scheduleList}>
      {daysIndexes.map((index) => (
        <CalendarDate variant={getDateVariant(index)} dayIndex={index} />
      ))}

      {history.map((pastActivity) => (
        <PastScheduleCard
          stars={pastActivity.stars}
          topic={pastActivity.topic}
        />
      ))}
      <Link to={`/game/${nextActivity}`}>
        <img src="" alt="study icon" />
        <p>Study Now</p>
      </Link>
      <CurrentScheduleCard />
      {futureCards.map(() => (
        <FutureScheduleCard />
      ))}
    </div>
  );
};

function getDateVariant(index: number): DateVariant {
  if (index === history.length) {
    return 'current';
  }
  if (index > history.length) {
    return 'future';
  }

  return 'past';
}

export default Schedule;
