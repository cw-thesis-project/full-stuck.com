/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import classNames from 'classnames';
import { arrow } from 'assets/icons';
import { TechExperience, TechName } from 'shared/types';
import TechAchievementCard from './TechAchievementCard';
import styles from './LearntTech.module.scss';

export type TechAchievement = { experience: number; isLocked: boolean };

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
        techSkillLevel={techAchievements[techName].experience}
      />
    ));

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Your skills</h2>
      <div className={styles.techRow}>
        <ScrollButton
          type="back"
          onClick={() => setStartIndex(startIndex - 1)}
          disabled={startIndex === 0}
        />
        <div className={styles.cardsContainer}>{achievementCards}</div>
        <ScrollButton
          type="forward"
          onClick={() => setStartIndex(startIndex + 1)}
          disabled={startIndex === 4}
        />
      </div>
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
      <img src={arrow} alt="arrow icon" />
    </button>
  );
};

export default LearntTech;
