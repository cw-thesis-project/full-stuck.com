import React from 'react';
import styles from './MatchedPile.module.scss';
import TechIcon from '../TechIcon';

import useMemoryGame from '../../containers/MemoryGame/useMemoryGame';

const MatchedPiled = (): JSX.Element => {
  const { lastMatched, matchesDone } = useMemoryGame();

  return (
    <div className={styles.container}>
      <TechIcon techName={lastMatched} iconSize="medium" isGray={false} />
      <div>{lastMatched}</div>
      <div>{matchesDone}</div>
    </div>
  );
};

export default MatchedPiled;
