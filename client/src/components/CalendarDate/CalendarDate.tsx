/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import styles from './CalendarDate.module.scss';

export type DateVariant = 'past' | 'current' | 'future';

interface Props {
  variant: DateVariant;
  dayIndex: number;
}

const dayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const CalendarDate = ({ variant, dayIndex }: Props): JSX.Element => {
  return (
    <div className={makeContainerClasses(variant)}>
      <div className={styles.number}>{dayIndex + 23}</div>
      <div className={styles.name}>{dayNames[dayIndex]}</div>
    </div>
  );
};

function makeContainerClasses(variant: DateVariant) {
  let containerClasses = styles.container;

  if (variant === 'current') {
    containerClasses += ` ${styles.circle} ${styles.light}`;
  } else if (variant === 'future') {
    containerClasses += ` ${styles.light}`;
  }

  return containerClasses;
}

export default CalendarDate;
