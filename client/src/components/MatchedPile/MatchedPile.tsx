import React from 'react';
import styles from './MatchedPile.module.scss';
import { TechName } from '../../shared/types';

interface Props {
  lastMatchedTech: TechName;
  numberOfMatches: number;
}

const MatchedPile = ({
  lastMatchedTech,
  numberOfMatches,
}: Props): JSX.Element => {
  return <div />;
};

export default MatchedPile;
