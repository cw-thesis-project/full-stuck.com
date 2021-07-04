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

  if (!stars) {
    return (
      <div className={styles.card}>
        <ScheduleItemHeader scheduleItemTopic="Test" />
        <img className={styles.sadFace} src={icons.sadFace} alt="sad face" />
        <p className={styles.paragraph}>Maybe you’ll get it right next time!</p>
        <div className={`${styles.ribbon} ${styles.failed}`}>Failed</div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <ScheduleItemHeader scheduleItemTopic={topic} />
      <div className={styles.starsRow}>
        {starsArray.map((_, index) => {
          const isRaised = fakeStars === 3 && index === 1;

          const middleStyle = {
            marginBottom: isRaised ? '1em' : 0,
          };

          return <img src={icons.star} style={middleStyle} alt="star" />;
        })}
      </div>
      <TechIcon techName={topic} iconSize="large" isGray={false} />
      <p className={styles.paragraph}>You did great, keep on going!</p>
      <div className={styles.ribbon}>Learnt</div>
    </div>
  );
};

export default PastScheduleCard;
