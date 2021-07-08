import React from 'react';
import styles from './ScheduleItemHeader.module.scss';

interface Props {
  topic: string;
  variant: 'primary' | 'accent' | 'disabled';
}

const ScheduleItemHeader = ({ topic, variant }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={`${styles.verticalBar} ${styles[variant]}`} />
      <h1 className={styles.topic}>{topic}</h1>
    </div>
  );
};

export default ScheduleItemHeader;
