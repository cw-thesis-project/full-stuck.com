import React from 'react';
import { StarsCount, TechName } from '../../shared/types';
import TechIcon from '../TechIcon';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './PastScheduleCard.module.scss';

interface Props {
  stars: StarsCount;
  topic: TechName;
}
const PastScheduleCard = ({ stars, topic }: Props): JSX.Element => {
  return (
    <>
      {!stars ? (
        <div className={styles.scheduleItem}>
          <ScheduleItemHeader scheduleItemTopic={topic} />
          <p>{`${stars}`}</p>
          <TechIcon techName={topic} iconSize="large" isGray />
          <p>nobody will ever hire you</p>
          <div
            className={
              (styles.achievementRibbon, styles.achievementRibbonColorFailed)
            }
          >
            <p className={styles.achievementMessage}>Failed</p>
          </div>
        </div>
      ) : (
        <div className={styles.scheduleItem}>
          <ScheduleItemHeader scheduleItemTopic={topic} />
          <p>{`${stars}`}</p>
          <TechIcon techName={topic} iconSize="large" isGray={false} />
          <p>Don’t you like it?</p>
          <div
            className={
              (styles.achievementRibbon, styles.achievementRibbonColor)
            }
          >
            <p className={styles.achievementMessage}>Learnt</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PastScheduleCard;
