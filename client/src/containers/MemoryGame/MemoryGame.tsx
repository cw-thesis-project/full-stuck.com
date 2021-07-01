import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './MemoryGame.module.scss';
import FlipsCounter from '../../components/FlipsCounter';
import MatchedPile from '../../components/MatchedPile';
import CardsTable from '../../components/CardsTable';
import useMemoryGame from './useMemoryGame';
import { actions, useAppDispatch } from '../../store';

const MemoryGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    lastMatched,
    matchesDone,
    flipsDone,
    allowedFlips,
    cards,
    handleCardChoice,
  } = useMemoryGame();

  useEffect(() => {
    const areAllCardsMatched = matchesDone >= cards.length / 2;
    const areAllFlipsUsed = flipsDone >= allowedFlips;

    if (areAllCardsMatched) {
      dispatch(actions.setPointsToAssign(1));
    }

    if (areAllFlipsUsed || areAllCardsMatched) {
      dispatch(
        actions.saveActivity({
          name: 'memory',
          topic: 'git',
          stars: areAllFlipsUsed ? 0 : 3,
        })
      );
      history.replace('/assign-points');
    }
  }, [flipsDone, matchesDone]);

  return (
    <div className={styles.screen}>
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
