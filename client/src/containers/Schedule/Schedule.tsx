import React from 'react';
import { Link } from 'react-router-dom';
import Schedule from '../../components/Schedule';
import { useAppSelector } from '../../store';
import { lastFiveElements, getNextActivity } from './helperFunctions';
import styles from './Schedule.module.scss';
import back from '../../assets/icons/back.svg';

const ScheduleContainer = (): JSX.Element | null => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    return <div>Not logged in?</div>;
  }

  const lastHistory = lastFiveElements(user.gameData.history);
  const nextActivity = getNextActivity(user.gameData.techExperience);

  return (
    <div className={styles.screen}>
      <Link to="/dashboard" className={styles.backIcon}>
        <img src={back} alt="back icon" />
      </Link>
      <Schedule
        history={lastHistory}
        nextActivity={nextActivity}
        historyLength={user.gameData.history.length}
      />
    </div>
  );
};

export default ScheduleContainer;
