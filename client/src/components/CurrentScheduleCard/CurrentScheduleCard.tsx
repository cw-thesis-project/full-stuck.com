import React from 'react';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './CurrentScheduleCard.module.scss';
import icons from '../../assets/icons';

const CurrentScheduleCard = (): JSX.Element => {
  return (
    <div className={styles.scheduleItem}>
      <ScheduleItemHeader scheduleItemTopic="await" />
      <img src={icons.hourGlassLogo} alt="hourGlass" />
      <p>Who knows what the future will bring</p>
    </div>
  );
};

export default CurrentScheduleCard;
