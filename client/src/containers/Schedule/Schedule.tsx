import React from 'react';
import Schedule from '../../components/Schedule';
import { failedWeek } from '../../components/Schedule/mock';

const ScheduleContainer = (): JSX.Element => {
  return (
    <div>
      <Schedule history={failedWeek} />
    </div>
  );
};

export default ScheduleContainer;
