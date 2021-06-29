import React from 'react';
import { StarsCount, TechName } from '../../shared/types';
import TechIcon from '../TechIcon';
import styles from './PastScheduleCard.module.scss';

interface Props {
  isFailed: boolean;
  stars: StarsCount;
  topic: TechName;
}
const PastScheduleCard = ({ isFailed, stars, topic }: Props): JSX.Element => {
  return (
    <>
      {isFailed ? (
        <div className={styles.scheduleItem}>
          <p>{`${topic}`}</p>
          <p>{`${stars}`}</p>
          <TechIcon techName={topic} iconSize="large" isGray />
          <p>nobody will ever hire you</p>
          <p>Failed</p>
        </div>
      ) : (
        <div className={styles.scheduleItem}>
          <p>{`${topic}`}</p>
          <p>{`${stars}`}</p>
          <TechIcon techName={topic} iconSize="large" isGray={false} />
          <p>Don’t you like it?</p>
          <p>Learnt</p>
        </div>
      )}
    </>
  );
};

export default PastScheduleCard;
