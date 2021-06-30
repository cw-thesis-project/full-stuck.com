import React from 'react';
import Schedule from '../../components/Schedule';
import { failedWeek } from '../../components/Schedule/mock';
import { useAppDispatch, useAppSelector } from '../../store';
import { lastFiveElements, getNextActivity } from './helperFunctions';

const ScheduleContainer = (): JSX.Element | null => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    alert('this will never happen');
    return null;
  }

  const lastHistory = lastFiveElements(user.gameData.history);
  const { techExperience } = user.gameData;
  const nextActivity = getNextActivity(techExperience);

  return (
    <div>
      <Schedule history={lastHistory} nextActivity={nextActivity} />
    </div>
  );
};

export default ScheduleContainer;
