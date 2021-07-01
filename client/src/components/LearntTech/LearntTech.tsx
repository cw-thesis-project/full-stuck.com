import React, { useState } from 'react';
import { TechExperience, TechName } from '../../shared/types';
import TechAchievementCard from './TechAchievementCard';
import styles from './LearntTech.module.scss';

export type TechAchievement = { level: number; isLocked: boolean };

export type TechAchievements = Record<TechName, TechAchievement>;

interface Props {
  techAchievements: TechAchievements;
}

const LearntTech = ({ techAchievements }: Props): JSX.Element => {
  const [startIndex, setStartIndex] = useState(0);

  const techKeys = Object.keys(techAchievements) as Array<keyof TechExperience>;

  const achievementCards = techKeys
    .slice(startIndex, startIndex + 5)
    .map((techName: TechName) => (
      <TechAchievementCard
        techName={techName}
        key={techName}
        isLocked={techAchievements[techName].isLocked}
        techSkillLevel={techAchievements[techName].level}
      />
    ));

  const showForwardButton = startIndex <= 3;
  const showBackButton = startIndex > 0;

  return (
    <div>
      {showBackButton && (
        <button onClick={() => setStartIndex(startIndex - 1)} type="button">
          {'<'}
        </button>
      )}
      <div className={styles.row}>{achievementCards}</div>
      {showForwardButton && (
        <button onClick={() => setStartIndex(startIndex + 1)} type="button">
          {'>'}
        </button>
      )}
    </div>
  );
};

export default LearntTech;
