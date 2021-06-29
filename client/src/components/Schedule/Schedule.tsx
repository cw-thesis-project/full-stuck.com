import React from 'react';
import { PastActivity } from '../../shared/types';
import PastScheduleCard from '../PastScheduleCard/PastScheduleCard';
import styles from './Schedule.module.scss';

interface Props {
  history: PastActivity[];
}

// converts user stars into a boolean
const isFailed = (stars: number): boolean => {
  if (!stars) return true;
  return false;
};

const Schedule = ({ history }: Props) => {
  return <PastScheduleCard isFailed={isFailed(history[0].stars)} />;
};

export default Schedule;
