import React from 'react';
import { Level, TechName } from '../../shared/types';
import styles from './CurrentLevelCard.module.scss';
import CardTechItem from './CardTechItem/CardTechItem';
import { maxTechnologyExperience } from '../../shared/constants';

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
          maxBubbles={maxTechnologyExperience}
        />
      );
    }
  );

  const pointsString = `${plusOrNot}${pointsToAssign}`;

  return (
    <button type="button" className={styles.container}>
      <h2 className={styles.title}>{level}</h2>
      <h3 className={styles.pointsBadge}>{pointsString}</h3>
      <div className={styles.techZone}>{techZone}</div>
      <p className={styles.textBottom}>Spend points to improve your skills</p>
    </button>
  );
};

export default CurrentLevelCard;
