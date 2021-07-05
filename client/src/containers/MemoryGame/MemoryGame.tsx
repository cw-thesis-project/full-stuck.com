/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MemoryGame.module.scss';
import FlipsCounter from '../../components/FlipsCounter';
import MemoryScore from '../../components/MemoryScore';
import CardsTable from '../../components/CardsTable';
import useMemoryGame, { allowedFlips } from './useMemoryGame';
import { actions, useAppDispatch } from '../../store';
import usePageTitle from '../../shared/usePageTitle';
import { sleep } from '../../shared/utils';
import { StarsCount } from '../../shared/types';

const MemoryGameContainer = (): JSX.Element => {
  // states
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { gameState, handleCardChoice } = useMemoryGame({
    onGameOver,
  });

  // effects
  usePageTitle('Memory — Full Stuck');

  async function onGameOver(starsCount: StarsCount) {
    if (starsCount > 0) {
      dispatch(actions.setPointsToAssign(1));
    }

    dispatch(
      actions.saveActivity({
        name: 'memory',
        // topic is temporary, will be modified after assigning points
        topic: 'git',
        stars: starsCount,
      })
    );

    await sleep(1_000);
    history.replace('/assign-points');
  }

  return (
    <div className={styles.screen}>
      <MemoryScore
        starsCount={gameState.starsCount}
        numberOfMatches={gameState.matchesDone}
        onClick={() => onGameOver(2)}
      />
      <div className={styles.gameContent}>
        <FlipsCounter flipsLeft={allowedFlips - gameState.flipsDone} />
        <CardsTable cards={gameState.cards} onCardClick={handleCardChoice} />
        <h2 className={styles.helperText}>Match the pairs!</h2>
      </div>
    </div>
  );
};

export default MemoryGameContainer;
