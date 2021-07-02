import React from 'react';
import { Level, TechName } from '../../shared/types';
import styles from './CurrentLevelCard.module.scss';
import CardTechItem from './CardTechItem/CardTechItem';
import { maxBubbles } from '../../shared/utils';

interface TechExperienceSubset {
  name: TechName;
  experience: number;
}

interface Props {
  pointsToAssign: number;
  techExperienceSubset: TechExperienceSubset[];
  level: Level;
  onIconClick(techName: TechName): void;
}

const CurrentLevelCard = ({
  pointsToAssign,
  techExperienceSubset,
  level,
  onIconClick,
}: Props): JSX.Element => {
  const plusOrNot = pointsToAssign > 0 ? '+' : '';

  const techZone: JSX.Element[] = techExperienceSubset.map(
    ({ name, experience }) => {
      return (
        <CardTechItem
          key={name}
          techName={name}
          experience={experience}
          onIconClick={onIconClick}
          maxBubbles={maxBubbles}
        />
      );
    }
  );

  const pointsString = `${plusOrNot}${pointsToAssign}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{level}</h2>
        <h3 className={styles.pointsBadge}>{pointsString}</h3>
      </div>
      <div className={styles.techZone}>{techZone}</div>
      <p className={styles.bottom}>Spend points to improve your skills</p>
    </div>
  );
};

export default CurrentLevelCard;
