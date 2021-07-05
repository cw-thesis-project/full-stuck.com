/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { animateFrom, fadeIn, slideRight } from '../../shared/animations';
import calendarDate from '../../components/CalendarDate/CalendarDate.module.scss';
import schedule from '../../components/Schedule/Schedule.module.scss';

function useScheduleAnimation(): void {
  useEffect(animateScheduleCards, []);
  useEffect(animateCalendarDates, []);

  function animateScheduleCards() {
    animateFrom(schedule.scheduleCard, {
      ...slideRight,
      stagger: 0.15,
    });
  }

  function animateCalendarDates() {
    animateFrom(calendarDate.container, {
      ...fadeIn,
      stagger: 0.15,
    });
  }
}

export default useScheduleAnimation;
