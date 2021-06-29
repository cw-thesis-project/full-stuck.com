import React, { useState } from 'react';
import { TechExperience, TechName } from '../../shared/types';
import TechAchievementCard from './TechAchievementCard';
import styles from './LearntTech.module.scss';

interface State {
  firstTechIndex: number;
}

interface Props {
  techExperience: TechExperience;
}

// TODO decide on hiding unlocked techs

const LearntTech: React.FC<Props> = ({ techExperience }: Props) => {
  const [firstTechIndex, setFirstTechIndex] = useState({});
  const techKeys = Object.keys(techExperience) as Array<keyof TechExperience>;

  const achievementCards = techKeys.map((techName: TechName) => {
    return (
      <TechAchievementCard
        techName={techName}
        key={techName}
        techSkillLevel={techExperience[techName]}
      />
    );
  });

  return <div className={`${styles.row}`}>{achievementCards}</div>;
};

export default LearntTech;
