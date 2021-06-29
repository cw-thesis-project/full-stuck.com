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
  return isLocked ? (
    <div className={`${styles.column} ${styles.card}`}>
      <h4>L</h4>
      <h4>any</h4>
    </div>
  ) : (
    <div className={`${styles.column} ${styles.card}`}>
      <TechIcon techName={techName} iconSize="small" isGray={false} />
      <h4>{techSkillLevel}/3</h4>
    </div>
  );
};

export default TechAchievementCard;
