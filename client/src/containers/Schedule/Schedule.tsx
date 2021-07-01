import React from 'react';
import Schedule from '../../components/Schedule';
import { useAppSelector } from '../../store';
import { lastFiveElements, getNextActivity } from './helperFunctions';

const ScheduleContainer = (): JSX.Element | null => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    return <div>Not logged in?</div>;
  }

  const lastHistory = lastFiveElements(user.gameData.history);
  const { techExperience } = user.gameData;
  const nextActivity = getNextActivity(techExperience);

  return (
    <Schedule
      history={lastHistory}
      nextActivity={nextActivity}
      historyLength={user.gameData.history.length}
    />
  );
};

export default ScheduleContainer;
