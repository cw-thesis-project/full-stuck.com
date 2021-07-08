import React, { useState } from 'react';
import { medal } from 'assets/icons';
import { Level } from 'shared/types';
import { technologies } from 'shared/constants';
import styles from './CompletedLevelCard.module.scss';
import TechMedal from './TechMedal';

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
      title={showDetails ? 'flip back' : 'show achievements'}
    >
      <h2 className={styles.title}>{level}</h2>
      {showDetails ? (
        <div className={styles.medalsContainer}>{techMedals}</div>
      ) : (
        <>
          <img src={medal} alt="medal" className={styles.img} />
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
