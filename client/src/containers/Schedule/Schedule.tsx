/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import { back } from 'assets/icons';
import usePageTitle from 'shared/usePageTitle';
import { playSound } from 'services/audioService';
import { useAppSelector } from 'store';
import Schedule from './Schedule/Schedule';
import { lastFiveElements, getNextActivity } from './helperFunctions';
import styles from './Schedule.module.scss';
import useScheduleAnimation from './useScheduleAnimation';

const ScheduleContainer = (): JSX.Element | null => {
  const user = useAppSelector((state) => state.user);
  usePageTitle('Schedule — Full Stuck');
  useScheduleAnimation();

  if (!user) {
    return <div>Not logged in?</div>;
  }

  const lastHistory = lastFiveElements(user.gameData.history);
  const nextActivity = getNextActivity(user.gameData.techExperience);

  return (
    <div className={styles.screen}>
      <Schedule
        history={lastHistory}
        nextActivity={nextActivity}
        historyLength={user.gameData.history.length}
      />
      <div className={styles.footer}>
        <Link
          to="/dashboard"
          className={styles.backIcon}
          title="dashboard"
          onClick={() => playSound('buttonClick')}
        >
          <img src={back} alt="back icon" />
        </Link>
        <p className={styles.quote}>
          “ 5 hours of debugging can save you 10 minutes of reading docs. ”
        </p>
      </div>
    </div>
  );
};

export default ScheduleContainer;
