import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './CurrentScheduleCard.module.scss';
import icons from '../../assets/icons';
import back from '../../assets/icons/back.svg';

const CurrentScheduleCard = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <ScheduleItemHeader scheduleItemTopic="await" />
        <div className={styles.imageContainer}>
          <img src={icons.hourGlassLogo} alt="hourGlass" />
        </div>
        <p className={styles.quote}>Who knows what the future will bring</p>
      </div>
      <Link to="/dashboard" className={styles.backIcon}>
        <img src={back} alt="back icon" />
      </Link>
    </div>
  );
};

export default CurrentScheduleCard;
