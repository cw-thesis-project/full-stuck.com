/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import styles from './MemoryGame.module.scss';
import FlipsCounter from '../../components/FlipsCounter';
import MemoryScore from '../../components/MemoryScore';
import CardsTable from '../../components/CardsTable';
import GameOver from '../../components/GameOver';
import useMemoryGame, { allowedFlips } from './useMemoryGame';
import { actions, useAppDispatch } from '../../store';
import usePageTitle from '../../shared/usePageTitle';
import { StarsCount, TechName } from '../../shared/types';
import useMemoryGameAnimations from './useMemoryGameAnimations';
import { pickRandomTopic } from '../../shared/utils';

const MemoryGameContainer = (): JSX.Element => {
  // states
  const dispatch = useAppDispatch();
  const [cheatUsed, setCheatUsed] = useState(false);
  const { gameState, handleCardChoice } = useMemoryGame({
    onGameOver,
  });

  // effects
  usePageTitle('Memory — Full Stuck');
  useMemoryGameAnimations();

  async function onGameOver(starsCount: StarsCount) {
    if (starsCount > 0) {
      dispatch(actions.setPointsToAssign(1));
    }

    // topic is temporary, will be modified after assigning points
    let topic: TechName = 'git';

    if (starsCount === 0) {
      topic = pickRandomTopic();
    }

    dispatch(
      actions.saveActivity({
        name: 'memory',
        topic,
        stars: starsCount,
      })
    );
  }

  function handleCheat() {
    setCheatUsed(true);
    onGameOver(2);
  }

  const showGameOver = gameState.isOver || cheatUsed;
  const starsNumber = cheatUsed ? 3 : gameState.starsCount;

  return (
    <div className={styles.screen}>
      {showGameOver && <GameOver starsCount={starsNumber} showStars />}
      <MemoryScore
        starsCount={gameState.starsCount}
        numberOfMatches={gameState.matchesDone}
        onClick={handleCheat}
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
