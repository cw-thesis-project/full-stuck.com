/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './MatchedPile.module.scss';
import TechIcon from '../TechIcon';
import { TechName } from '../../shared/types';

interface Props {
  lastMatchedTech: TechName;
  numberOfMatches: number;
  onClick(): void;
}

const MatchedPiled = ({
  lastMatchedTech,
  numberOfMatches,
  onClick,
}: Props): JSX.Element => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.card}>
        <TechIcon techName={lastMatchedTech} iconSize="medium" isGray={false} />
      </div>
      <h3>{numberOfMatches} Matched</h3>
    </div>
  );
};

export default MatchedPiled;
