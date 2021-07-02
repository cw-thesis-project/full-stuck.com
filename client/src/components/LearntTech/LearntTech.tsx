/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import classNames from 'classnames';
import { TechExperience, TechName } from '../../shared/types';
import TechAchievementCard from './TechAchievementCard';
import styles from './LearntTech.module.scss';
import icons from '../../assets/icons';

export type TechAchievement = { level: number; isLocked: boolean };

export type TechAchievements = Record<TechName, TechAchievement>;

interface Props {
  techAchievements: TechAchievements;
}

const LearntTech = ({ techAchievements }: Props): JSX.Element => {
  const [startIndex, setStartIndex] = useState(0);

  const techKeys = Object.keys(techAchievements) as Array<keyof TechExperience>;

  // TODO: scroll smoothly
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

  return (
    <div className={styles.container}>
      <ScrollButton
        type="back"
        onClick={() => setStartIndex(startIndex - 1)}
        disabled={startIndex === 0}
      />
      {achievementCards}
      <ScrollButton
        type="forward"
        onClick={() => setStartIndex(startIndex + 1)}
        disabled={startIndex === 4}
      />
    </div>
  );
};

interface ScrollButtonProps {
  type: 'forward' | 'back';
  disabled: boolean;
  onClick(): void;
}

// TODO: move somewhere else
const ScrollButton = ({ type, onClick, disabled }: ScrollButtonProps) => {
  const className = classNames({
    [styles.disabled]: disabled,
    [styles.scrollButton]: true,
    [styles.flipped]: type === 'back',
  });

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={onClick}
      type="button"
    >
      <img src={icons.arrow} alt="arrow icon" />
    </button>
  );
};

export default LearntTech;
