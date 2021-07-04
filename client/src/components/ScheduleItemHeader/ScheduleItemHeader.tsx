import React from 'react';
import styles from './ScheduleItemHeader.module.scss';

interface Props {
  topic: string;
}

const ScheduleItemHeader = ({ topic }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.verticalBar} />
      <h1 className={styles.topic}>{topic}</h1>
    </div>
  );
};

export default ScheduleItemHeader;
