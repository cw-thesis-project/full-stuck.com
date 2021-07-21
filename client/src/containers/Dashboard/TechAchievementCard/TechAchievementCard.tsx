/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import { TechName } from 'shared/types';
import { maxTechnologyExperience } from 'shared/constants';
import { playSound } from 'services/audioService';
import { TechIcon } from 'components';
import styles from './TechAchievementCard.module.scss';

interface Props {
  techName: TechName;
  techSkillLevel: number;
  isLocked: boolean;
}

const TechAchievementCard = ({
  techName,
  techSkillLevel,
  isLocked,
}: Props): JSX.Element => {
  return (
    <Link
      to="/assign-points"
      className={styles.card}
      title={isLocked ? 'unknown' : techName}
      onClick={() => playSound('buttonClick')}
    >
      <TechIcon
        techName={techName}
        iconSize="medium"
        isGray={false}
        isLocked={isLocked}
      />
      <h4 className={styles.techLevel}>
        {techSkillLevel}/{maxTechnologyExperience}
      </h4>
    </Link>
  );
};

export default TechAchievementCard;
