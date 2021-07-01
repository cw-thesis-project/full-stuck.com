import React from 'react';

import styles from './MemoryGame.module.scss';
import FlipsCounter from '../../components/FlipsCounter';
import MatchedPile from '../../components/MatchedPile';
import CardsTable from '../../components/CardsTable';
import useMemoryGame from './useMemoryGame';

const MemoryGame = (): JSX.Element => {
  const {
    lastMatched,
    matchesDone,
    flipsDone,
    allowedFlips,
    cards,
    handleCardChoice,
  } = useMemoryGame();

  return (
    <div className={styles.container}>
      <FlipsCounter flipsDone={flipsDone} allowedFlips={allowedFlips} />
      <CardsTable cards={cards} onCardClick={handleCardChoice} />
      <MatchedPile
        lastMatchedTech={lastMatched}
        numberOfMatches={matchesDone}
      />
    </div>
  );
};

export default MemoryGame;
