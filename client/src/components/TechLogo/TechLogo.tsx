/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
import React from 'react';
import classNames from 'classnames';
import { TechName } from 'shared/types';
import styles from './TechLogo.module.scss';
import TechIcon from '../TechIcon';

interface Props {
  lastRoundWon?: boolean;
  status: 'upcoming' | 'current' | 'completed' | 'failed' | 'ongoing';
  techName: TechName | 'empty';
}

const TechLogo = ({ lastRoundWon, status, techName }: Props): JSX.Element => {
  const containerClass = classNames({
    [styles.logoContainer]: true,
    [styles.currentTech]: status === 'current',
    [styles.faded]: status !== 'current',
  });

  return techName !== 'empty' ? (
    <div className={containerClass}>
      <TechIcon
        techName={techName}
        iconSize={status === 'current' ? 'large' : 'medium'}
        isGray={false}
      />
    </div>
  ) : (
    <div className={styles.empty} />
  );
};
export default TechLogo;
