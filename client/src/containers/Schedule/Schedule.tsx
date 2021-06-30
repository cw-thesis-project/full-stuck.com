import React from 'react';
import Schedule from '../../components/Schedule';
import { failedWeek } from '../../components/Schedule/mock';
import { useAppDispatch, useAppSelector } from '../../store';
import { lastFiveElements } from './helperFunctions';

const ScheduleContainer = (): JSX.Element | null => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    alert('this will never happen');
    return null;
  }

  const lastHistory = lastFiveElements(user.gameData.history);

  return (
    <div>
      <Schedule history={lastHistory} />
    </div>
  );
};

export default ScheduleContainer;
