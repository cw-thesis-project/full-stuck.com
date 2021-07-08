import React from 'react';
import { medal } from 'assets/icons';
import { TechName } from '../../../shared/types';
import styles from './TechMedal.module.scss';

interface Props {
  techName: TechName;
}

const TechMedal = ({ techName }: Props): JSX.Element => {
  return (
    <div className={styles.medal}>
      <img src={medal} alt="medal" className={styles.img} />
      <h4 className={styles.techName}>{techName}</h4>
    </div>
  );
};

export default TechMedal;
