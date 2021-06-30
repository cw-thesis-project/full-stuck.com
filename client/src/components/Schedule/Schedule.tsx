import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, PastActivity } from '../../shared/types';
import FutureScheduleCard from '../FutureScheduleCard';
import CurrentScheduleCard from '../CurrentScheduleCard';
import PastScheduleCard from '../PastScheduleCard';
import CalendarDate from '../CalendarDate';
import getDateVariant from './helperFunctions';
import styles from './Schedule.module.scss';
import icons from '../../assets/icons';

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

  return (
    <div className={styles.scheduleList}>
      {daysIndexes.map((index) => (
        <CalendarDate
          variant={getDateVariant(index, history.length)}
          dayIndex={historyLength + index}
        />
      ))}

      {history.map((pastActivity) => (
        <PastScheduleCard
          stars={pastActivity.stars}
          topic={pastActivity.topic}
        />
      ))}
      <Link to={`/game/${nextActivity}`}>
        <div className={styles.button}>
          <img src={icons.graduationHat} alt="study icon" />
          <p>Study Now</p>
        </div>
      </Link>
      <CurrentScheduleCard />
      {futureCards.map(() => (
        <FutureScheduleCard />
      ))}
    </div>
  );
};

export default Schedule;
