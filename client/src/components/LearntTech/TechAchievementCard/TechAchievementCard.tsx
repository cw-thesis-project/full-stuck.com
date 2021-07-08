import React from 'react';
import { Link } from 'react-router-dom';
import TechIcon from '../../TechIcon';
import { TechName } from '../../../shared/types';
import styles from './TechAchievementCard.module.scss';
import { maxTechnologyExperience } from '../../../shared/constants';

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
