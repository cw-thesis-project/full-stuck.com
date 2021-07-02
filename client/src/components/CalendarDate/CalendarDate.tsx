/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import classNames from 'classnames';
import styles from './CalendarDate.module.scss';

export type DateVariant = 'past' | 'current' | 'future';

interface Props {
  variant: DateVariant;
  dayIndex: number;
}

const dayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const CalendarDate = ({ variant, dayIndex }: Props): JSX.Element => {
  const container = classNames({
    [styles.container]: true,
    [styles.circle]: variant === 'current',
    [styles.light]: variant === 'current' || dayIndex % 6 > 2,
  });

  return (
    <div className={container}>
      <div className={styles.number}># {dayIndex}</div>
      <div className={styles.name}>{dayNames[dayIndex]}</div>
    </div>
  );
};

export default CalendarDate;
