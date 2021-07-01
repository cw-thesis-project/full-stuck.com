import React from 'react';
import styles from './MatchedPile.module.scss';
import TechIcon from '../TechIcon';
import { TechName } from '../../shared/types';

interface Props {
  lastMatchedTech: TechName;
  numberOfMatches: number;
}

const MatchedPiled = ({
  lastMatchedTech,
  numberOfMatches,
}: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <TechIcon techName={lastMatchedTech} iconSize="medium" isGray={false} />
      <div>{lastMatchedTech}</div>
      <div>{numberOfMatches}</div>
    </div>
  );
};

export default MatchedPiled;
