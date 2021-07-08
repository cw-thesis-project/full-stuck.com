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
  const number = classNames({
    [styles.number]: true,
    [styles.circle]: variant === 'current',
  });

  return (
    <div className={styles.container}>
      <div className={styles.name}>{dayNames[dayIndex]}</div>
      <div className={number}>{activityIndex}</div>
    </div>
  );
};

export default CalendarDate;
