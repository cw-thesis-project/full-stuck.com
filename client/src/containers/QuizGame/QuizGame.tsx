/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { StarsCount, TechName } from 'shared/types';
import { pickRandomTopic } from 'shared/utils';
import { actions, useAppDispatch } from 'store';
import { TechLogo, StarsRow, GameOver } from 'components';
import {
  pickTech,
  quizTechs,
  quizRules,
  renderer,
  getStarsCount,
} from './helpers';
import styles from './QuizGame.module.scss';
import useQuizGameAnimations from './useQuizGameAnimations';

type QuizOutcome = 'failed' | 'completed' | 'ongoing';

const QuizGame = (): JSX.Element => {
  const initialLogos = pickTech(quizRules.rounds, quizTechs);
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState<number>(
    quizRules.rounds - 1
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState('');
  const [logos] = useState(initialLogos);
  const [starsCount, setStarsCount] = useState<StarsCount>(0);
  const [outcome, setOutcome] = useState<QuizOutcome>('ongoing');
  const [lastRoundWon, setLastRoundWon] = useState(false);

  useEffect(updateStarsCount, [score]);
  useEffect(resetEachRound, [outcome]);

  useQuizGameAnimations(currentIndex);

  function updateStarsCount() {
    const newStars = getStarsCount(score);
    setStarsCount(newStars);
  }

  function onTextchange(string: string) {
    setText(string);

    if (logos && currentIndex > -1) {
      if (string.toLowerCase() === logos[currentIndex].toLowerCase()) {
        setOutcome('completed');
        setLastRoundWon(true);
      }
      if (
        string[string.length - 1] !== logos[currentIndex][string.length - 1]
      ) {
        setOutcome('failed');
        setLastRoundWon(false);
      }
    }
  }

  function resetEachRound() {
    checkIfGameOver();
    if (logos && outcome !== 'ongoing') {
      if (outcome === 'completed') setScore((prev) => prev + 1);
      setCurrentIndex((prev) => prev - 1);
      setText('');
      setOutcome('ongoing');
    }
  }

  function gimmeTechName(index: number): TechName | 'empty' {
    if (logos && logos[index]) return logos[index];
    return 'empty';
  }

  function checkIfGameOver() {
    if (currentIndex < 0) afterGameOver();
  }

  function afterGameOver() {
    setIsGameOver(true);

    if (starsCount > 0) {
      dispatch(actions.setPointsToAssign(1));
    }

    let topic: TechName = 'git';

    if (starsCount === 0) {
      topic = pickRandomTopic();
    }

    dispatch(
      actions.saveActivity({
        name: 'quiz',
        topic,
        stars: starsCount,
      })
    );
  }

  const memoizedCountdown = React.useMemo(() => {
    return (
      <Countdown
        date={Date.now() + quizRules.countdownDuration}
        onComplete={() => setOutcome('failed')}
        intervalDelay={0}
        precision={2}
        renderer={renderer}
        key={currentIndex}
      />
    );
  }, [outcome]);

  return (
    <div className={styles.screen}>
      {isGameOver && <GameOver starsCount={starsCount} showStars />}
      <div className={styles.header}>
        <StarsRow starsCount={starsCount} />
        <div className={styles.scoreContainer}>
          <h1 title="correct icons" className={styles.score}>
            +{score}
          </h1>
          <h1 title="icons left">-{currentIndex}</h1>
        </div>
      </div>
      <div className={styles.logosContainer}>
        <TechLogo
          status="upcoming"
          techName={gimmeTechName(currentIndex - 1)}
        />
        <TechLogo status="current" techName={gimmeTechName(currentIndex)} />
        <TechLogo
          lastRoundWon={lastRoundWon}
          status={outcome}
          techName={gimmeTechName(currentIndex + 1)}
        />
      </div>
      <h2 className={styles.helperText}>Name the icon!</h2>
      <div className={styles.inputContainer}>
        <input
          className={styles.textInput}
          value={text}
          type="text"
          placeholder="Type carefully ..."
          onChange={(e) => {
            onTextchange(e.target.value);
          }}
        />
        {memoizedCountdown}
      </div>
    </div>
  );
};

export default QuizGame;
