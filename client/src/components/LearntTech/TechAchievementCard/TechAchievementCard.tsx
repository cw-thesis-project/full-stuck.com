import React from 'react';
import TechIcon from '../../TechIcon';
import { TechName } from '../../../shared/types';
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
    <div className={styles.card}>
      <TechIcon
        techName={techName}
        iconSize="medium"
        isGray={false}
        isLocked={isLocked}
      />
      <h2>{techSkillLevel}/3</h2>
    </div>
  );
};

export default TechAchievementCard;
