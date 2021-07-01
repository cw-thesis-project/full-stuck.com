import React from 'react';
import Schedule from '../../components/Schedule';
import { useAppSelector } from '../../store';
import { lastFiveElements, getNextActivity } from './helperFunctions';
import styles from './Schedule.module.scss';

const ScheduleContainer = (): JSX.Element | null => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    return <div>Not logged in?</div>;
  }

  const lastHistory = lastFiveElements(user.gameData.history);
  const { techExperience } = user.gameData;
  const nextActivity = getNextActivity(techExperience);

  return (
    <div className={styles.screen}>
      <Schedule
        history={lastHistory}
        nextActivity={nextActivity}
        historyLength={user.gameData.history.length}
      />
    </div>
  );
};

export default ScheduleContainer;
