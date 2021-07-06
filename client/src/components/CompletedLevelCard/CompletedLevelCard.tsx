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
    <button
      type="button"
      onClick={() => setShowDetails(!showDetails)}
      className={styles.container}
    >
      <h2 className={styles.title}>{level}</h2>
      {showDetails ? (
        <div className={styles.medalsContainer}>{techMedals}</div>
      ) : (
        <>
          <img src={icons.medal} alt="medal" className={styles.img} />
          <h3 className={styles.cardStatus}>Completed</h3>
        </>
      )}
      <p className={styles.textBottom}>
        Be proud of yourself! This was not easy
      </p>
    </button>
  );
};

export default CompletedLevelCard;
