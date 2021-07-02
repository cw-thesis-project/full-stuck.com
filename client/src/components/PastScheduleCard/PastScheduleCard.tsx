import React from 'react';
import { StarsCount, TechName } from '../../shared/types';
import TechIcon from '../TechIcon';
import ScheduleItemHeader from '../ScheduleItemHeader';
import styles from './PastScheduleCard.module.scss';
import icons from '../../assets/icons';

interface Props {
  stars: StarsCount;
  topic: TechName;
}
const PastScheduleCard = ({ stars, topic }: Props): JSX.Element => {
  const starsArray: number[] = [];
  const fakeStars = stars;
  starsArray.length = fakeStars;
  starsArray.fill(0);

  return (
    <>
      {!stars ? (
        <div className={styles.scheduleItem}>
          <ScheduleItemHeader scheduleItemTopic={topic} />
          <TechIcon techName={topic} iconSize="large" isGray />
          <p>will ever hire you</p>
          <div
            className={`${styles.achievementRibbon} ${styles.achievementRibbonColorFailed}`}
          >
            <p className={styles.achievementMessage}>Failed</p>
          </div>
        </div>
      ) : (
        <div className={styles.scheduleItem}>
          <ScheduleItemHeader scheduleItemTopic={topic} />
          <div className={styles.starsContainer}>
            {starsArray.map((_, index) => {
              const isRaised = fakeStars === 3 && index === 1;

              const middleStyle = {
                marginBottom: isRaised ? '1em' : 0,
              };

              return <img src={icons.star} style={middleStyle} alt="star" />;
            })}
          </div>
          <TechIcon techName={topic} iconSize="large" isGray={false} />
          <p>Don’t you like it?</p>
          <div
            className={`${styles.achievementRibbon} ${styles.achievementRibbonColor}`}
          >
            <p className={styles.achievementMessage}>Learnt</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PastScheduleCard;
