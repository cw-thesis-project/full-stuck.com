import React, { useState } from 'react';
import { Level } from '../../shared/types';
import styles from './CompletedLevelCard.module.scss';
import icons from '../../assets/icons';
import TechMedal from './TechMedal';
import { technologies } from '../../shared/constants';

interface Props {
  level: Level;
}

const CompletedLevelCard = ({ level }: Props): JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);

  const techMedals = technologies
    .filter((obj) => {
      return obj.level === level;
    })
    .map((tech) => <TechMedal techName={tech.name} />);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => console.log('')}
      onClick={() => setShowDetails(!showDetails)}
      className={styles.container}
    >
      <div className={styles.title}>
        <h2>{level}</h2>
      </div>
      {showDetails ? (
        techMedals
      ) : (
        <div className={styles.medalZone}>
          <img src={icons.medal} alt="medal" className={styles.img} />
          <h3>Completed</h3>
        </div>
      )}
      <div className={styles.bottom}>
        <h4>Be proud of yourself! This was not easy</h4>
      </div>
    </div>
  );
};

export default CompletedLevelCard;
