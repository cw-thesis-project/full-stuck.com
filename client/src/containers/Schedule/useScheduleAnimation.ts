/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import { animateFrom, fadeIn, slideRight } from 'shared/animations';
import calendarDate from '../../components/CalendarDate/CalendarDate.module.scss';
import schedule from '../../components/Schedule/Schedule.module.scss';
import container from './Schedule.module.scss';

function useScheduleAnimation(): void {
  useEffect(animateScheduleCards, []);
  useEffect(animateCalendarDates, []);
  useEffect(animateFooter, []);

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

  function animateFooter() {
    animateFrom(container.footer, {
      y: '-2em',
      opacity: 0,
      ease: 'power3.out',
      delay: 1,
    });
  }
}

export default useScheduleAnimation;
