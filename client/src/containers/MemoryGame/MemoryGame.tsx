import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './MemoryGame.module.scss';
import FlipsCounter from '../../components/FlipsCounter';
import MatchedPile from '../../components/MatchedPile';
import CardsTable from '../../components/CardsTable';
import useMemoryGame from './useMemoryGame';
import { actions, useAppDispatch, useAppSelector } from '../../store';

const MemoryGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loading = useAppSelector((state) => state.loading);
  const {
    lastMatched,
    matchesDone,
    flipsDone,
    allowedFlips,
    cards,
    handleCardChoice,
  } = useMemoryGame();

  useEffect(() => {
    const isGameOver = matchesDone >= cards.length / 2;
    if (isGameOver) {
      console.log('game over');
      // save activity (async)
      dispatch(
        actions.saveActivity({
          name: 'memory',
          topic: 'git',
          stars: 3,
        })
      );
    }
  }, [matchesDone]);

  // after activity has been saved
  useEffect(() => {
    const isGameOver = matchesDone >= cards.length / 2;
    if (isGameOver && !loading) {
      console.log('activity saved');
      dispatch(actions.setPointsToAssign(1));
      history.replace('/assign-points');
    }
  }, [loading]);

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
