import React, { useState } from 'react';
import { TechExperience, TechName } from '../../shared/types';
import TechAchievementCard from './TechAchievementCard';
import styles from './LearntTech.module.scss';

interface State {
  firstTechIndex: number;
}
export type TechAchievement = { level: number; isLocked: boolean };

export type TechAchievements = Record<TechName, TechAchievement>;

interface Props {
  techAchievements: TechAchievements;
}

const LearntTech = ({ techAchievements }: Props): JSX.Element => {
  // const [firstTechIndex, setFirstTechIndex] = useState({});

  const techKeys = Object.keys(techAchievements) as Array<keyof TechExperience>;

  const achievementCards = techKeys.map((techName: TechName, i) => {
    if (i > 4) return null;
    return (
      <TechAchievementCard
        techName={techName}
        key={techName}
        isLocked={techAchievements[techName].isLocked}
        techSkillLevel={techAchievements[techName].level}
      />
    );
  });

  return <div className={`${styles.row}`}>{achievementCards}</div>;
};

export default LearntTech;
