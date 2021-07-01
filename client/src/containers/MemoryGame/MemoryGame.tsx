import React from 'react';

import styles from './MemoryGame.module.scss';
import FlipsCounter from '../../components/FlipsCounter';
import MatchedPile from '../../components/MatchedPile';
import CardsTable from '../../components/CardsTable';

const MemoryGame = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <FlipsCounter />
      <CardsTable />
      <MatchedPile />
    </div>
  );
};

export default MemoryGame;
