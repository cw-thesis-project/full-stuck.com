import React from 'react';
import { PastActivity } from '../../shared/types';
import styles from './Schedule.module.scss';

interface Props {
  history: PastActivity[];
}

const Schedule = ({ history }: Props) => {
  return (
    <div>
      {history.map((calendar) => {
        return <p>{calendar.stars}</p>;
      })}
    </div>
  );
};

export default Schedule;
