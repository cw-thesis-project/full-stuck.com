/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './MemoryGame.module.scss';
import FlipsCounter from '../../components/FlipsCounter';
import MemoryScore from '../../components/MemoryScore';
import CardsTable from '../../components/CardsTable';
import useMemoryGame from './useMemoryGame';
import { actions, useAppDispatch } from '../../store';

const MemoryGameContainer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const game = useMemoryGame();

  useEffect(checkIfGameOver, [game.flipsDone, game.matchesDone]);

  function checkIfGameOver() {
    const areAllCardsMatched = game.matchesDone >= game.cards.length / 2;
    const areAllFlipsUsed = game.flipsDone >= game.allowedFlips;

    if (areAllFlipsUsed || areAllCardsMatched) {
      afterGameOver(areAllCardsMatched);
    }
  }

  function afterGameOver(hasWon: boolean) {
    if (hasWon) {
      dispatch(actions.setPointsToAssign(1));
    }

    dispatch(
      actions.saveActivity({
        name: 'memory',
        topic: 'git',
        stars: hasWon ? 0 : 3,
      })
    );

    history.replace('/assign-points');
  }

  return (
    <div className={styles.screen}>
      <MemoryScore
        starsCount={game.starsCount}
        numberOfMatches={game.matchesDone}
        onClick={() => afterGameOver(true)}
      />
      <div className={styles.gameContent}>
        <FlipsCounter flipsLeft={game.allowedFlips - game.flipsDone} />
        <CardsTable cards={game.cards} onCardClick={game.handleCardChoice} />
        <h2 className={styles.helperText}>Match the pairs!</h2>
      </div>
    </div>
  );
};

export default MemoryGameContainer;
