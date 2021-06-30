import React from 'react';
import { Level, TechName } from '../../shared/types';
import styles from './CurrentLevelCard.module.scss';
import CardTechItem from './CardTechItem/CardTechItem';

interface TechWhat {
  name: TechName;
  experience: number;
}

interface Props {
  pointsToAssign: number;
  techExperienceSubset: TechWhat[];
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
  const maxBubbles = 5;
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

  return (
    <div className={styles.container}>
      <div className={styles.points}>
        <h3>
          {plusOrNot}
          {pointsToAssign}
        </h3>
      </div>
      <h2>{level}</h2>
      <div className={styles.techZone}>{techZone}</div>
      <div className={styles.bottom}>
        <h4>Spend points to improve your skills</h4>
      </div>
    </div>
  );
};

export default CurrentLevelCard;
