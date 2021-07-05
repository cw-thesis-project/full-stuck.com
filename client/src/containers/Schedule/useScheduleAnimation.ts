/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { animateFrom } from '../../shared/animations';
import calendarDate from '../../components/CalendarDate/CalendarDate.module.scss';
import schedule from '../../components/Schedule/Schedule.module.scss';

function useScheduleAnimation(): void {
  useEffect(animateScheduleCards, []);
  useEffect(animateCalendarDates, []);

  function animateScheduleCards() {
    animateFrom(schedule.scheduleCard, {
      y: '2em',
      opacity: 0,
      ease: 'power3.out',
      stagger: 0.3,
    });
  }

  function animateCalendarDates() {
    animateFrom(calendarDate.container, {
      opacity: 0,
      stagger: 0.3,
    });
  }
}

export default useScheduleAnimation;
