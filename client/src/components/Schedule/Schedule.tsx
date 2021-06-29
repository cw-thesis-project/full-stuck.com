import React from 'react';
import { PastActivity } from '../../shared/types';
import PastScheduleCard from '../PastScheduleCard/PastScheduleCard';
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
  return (
    <div className={styles.scheduleList}>
      {history.map((pastActivity: PastActivity) => {
        return (
          <PastScheduleCard
            // key={pastActivity.name}
            isFailed={isFailed(pastActivity.stars)}
            stars={pastActivity.stars}
            topic={pastActivity.topic}
          />
        );
      })}
    </div>
  );
};

export default Schedule;
