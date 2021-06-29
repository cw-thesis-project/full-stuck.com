import React from 'react';
import Schedule from '../../components/Schedule';
import { completedWeek } from '../../components/Schedule/mock';

const ScheduleContainer = (): JSX.Element => {
  return (
    <div>
      <Schedule history={completedWeek} />
    </div>
  );
};

export default ScheduleContainer;
