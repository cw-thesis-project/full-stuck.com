/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { actions, useAppDispatch } from '../../store';
import { pickTech, quizTechs, quizRules, renderer } from './helpers';
import styles from './QuizGame.module.scss';
import TechLogo from '../../components/TechLogo';
import { TechName } from '../../shared/types';
import StarsRow from '../../components/StarsRow';
import GameOver from '../../components/GameOver';
import useQuizGameAnimations from './useQuizGameAnimations';

const QuizGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState<number>(
    quizRules.rounds - 1
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState('');
  const [logos, setLogos] = useState<TechName[]>();
  const [outcome, setOutcome] = useState<'failed' | 'completed' | 'ongoing'>(
    'ongoing'
  );
  const [lastRoundWon, setLastRoundWon] = useState(false);
  const winThreshold = quizRules.threshold * quizRules.rounds;

  useEffect(() => {
    setLogos(pickTech(quizRules.rounds, quizTechs));
  }, []);

  useQuizGameAnimations(currentIndex);

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

  // reset each round
  useEffect(() => {
    checkIfGameOver();
    if (logos && outcome !== 'ongoing') {
      if (outcome === 'completed') setScore((prev) => prev + 1);
      setCurrentIndex((prev) => prev - 1);
      setText('');
      setOutcome('ongoing');
    }
  }, [outcome]);

  function gimmeTechName(index: number): TechName | 'empty' {
    if (logos && logos[index]) return logos[index];
    return 'empty';
  }

  function checkIfGameOver() {
    if (currentIndex < 0) afterGameOver(score > winThreshold);
  }

  function afterGameOver(hasWon: boolean) {
    setIsGameOver(true);
    if (hasWon) dispatch(actions.setPointsToAssign(1));
    else dispatch(actions.setPointsToAssign(0));

    dispatch(
      actions.saveActivity({
        name: 'memory',
        topic: 'git',
        stars: hasWon ? 0 : 3,
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
      {isGameOver && (
        <GameOver starsCount={score > winThreshold ? 3 : 0} showStars />
      )}
      <div className={styles.header}>
        <StarsRow starsCount={1} />
        <div className={styles.scoreContainer}>
          <h1 className={styles.score}>+{score}</h1>
          <h1>-{currentIndex}</h1>
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
