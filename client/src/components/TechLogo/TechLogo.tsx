/* eslint-disable react/require-default-props */
import React from 'react';
import { TechName } from '../../shared/types';
import styles from './TechLogo.module.scss';
import TechIcon from '../TechIcon';

interface Props {
  lastRoundWon?: boolean;
  status: 'upcoming' | 'current' | 'completed' | 'failed' | 'ongoing';
  techName: TechName | 'empty';
}

const TechLogo = ({ lastRoundWon, status, techName }: Props): JSX.Element => {
  return techName !== 'empty' ? (
    <div
      className={`${styles.logoContainer} ${
        status === 'current' ? styles.currentTech : ''
      }`}
    >
      <TechIcon
        techName={techName}
        iconSize={status === 'current' ? 'large' : 'small'}
        isGray={lastRoundWon === undefined ? false : !lastRoundWon}
      />
      {/* {status === 'ongoing' ? techName : ''} */}
    </div>
  ) : (
    <div className={styles.empty} />
  );
};
export default TechLogo;
