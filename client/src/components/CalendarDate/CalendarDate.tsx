/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import classNames from 'classnames';
import styles from './CalendarDate.module.scss';

export type DateVariant = 'past' | 'current' | 'future';

interface Props {
  variant: DateVariant;
  dayIndex: number;
  activityIndex: number;
}

const dayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const CalendarDate = ({
  variant,
  dayIndex,
  activityIndex,
}: Props): JSX.Element => {
  const container = classNames({
    [styles.container]: true,
    [styles.circle]: variant === 'current',
  });

  return (
    <div className={container}>
      <div className={styles.number}># {activityIndex}</div>
      <div className={styles.name}>{dayNames[dayIndex]}</div>
    </div>
  );
};

export default CalendarDate;
