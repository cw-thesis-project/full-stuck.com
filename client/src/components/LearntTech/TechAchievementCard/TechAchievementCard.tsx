import React from 'react';
import TechIcon from '../../TechIcon';
import { TechName } from '../../../shared/types';
import styles from './TechAchievementCard.module.scss';

interface Props {
  techName: TechName;
  techSkillLevel: number;
}

const TechAchievementCard = ({
  techName,
  techSkillLevel,
}: Props): JSX.Element => {
  return (
    <div className={`${styles.column} ${styles.card}`}>
      <TechIcon techName={techName} iconSize="small" isGray={false} />
      <h4>{techSkillLevel}/3</h4>
    </div>
  );
};

export default TechAchievementCard;
