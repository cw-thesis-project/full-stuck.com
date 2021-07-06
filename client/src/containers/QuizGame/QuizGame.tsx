/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Countdown from 'react-countdown';
import { actions, useAppDispatch, useAppSelector } from '../../store';
import { pickTech, quizTechs, quizRules, renderer } from './helpers';
import styles from './QuizGame.module.scss';
import TechLogo from '../../components/TechLogo';
import { TechName } from '../../shared/types';

const QuizGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState<number>(
    quizRules.rounds - 1
  );
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
    if (hasWon) dispatch(actions.setPointsToAssign(1));
    else dispatch(actions.setPointsToAssign(0));

    dispatch(
      actions.saveActivity({
        name: 'memory',
        topic: 'git',
        stars: hasWon ? 0 : 3,
      })
    );
    history.replace('/assign-points');
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
    <div className={styles.container}>
      {memoizedCountdown}
      <div className={styles.scoreContainer}>
        <h1 className={styles.score}>
          {score}
          {`${' '}`}
        </h1>
        <h2> / {quizRules.rounds}</h2>
      </div>
      <div className={styles.logosContainer}>
        <div className={styles.tempText}>The answer (to be coded)</div>
        <div className={styles.iconZone}>
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
      </div>
      <div>How big is your tech knowledge ?</div>
      <div>
        <form>
          <input
            className={styles.textInput}
            value={text}
            type="text"
            placeholder="Type carefully ! "
            onChange={(e) => {
              onTextchange(e.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default QuizGame;
