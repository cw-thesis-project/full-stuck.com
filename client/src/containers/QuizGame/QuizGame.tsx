/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Countdown from 'react-countdown';
import { actions, useAppDispatch, useAppSelector } from '../../store';
import { quizTechs, quizRules } from './helpers';
import styles from './QuizGame.module.scss';
import TechLogo from '../../components/TechLogo';
import { TechName } from '../../shared/types';

interface CountDownProps {
  milliseconds: number;
  seconds: number;
  completed: boolean;
}

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

  useEffect(() => {
    setLogos(pickTech(quizRules.rounds, quizTechs));
  }, []);

  function onTextchange(string: string) {
    setText(string);
    checkIfGameOver();
    if (logos && currentIndex > -1) {
      if (string.toLowerCase() === logos[currentIndex].toLowerCase()) {
        setOutcome('completed');
      }
      if (
        string[string.length - 1] !== logos[currentIndex][string.length - 1]
      ) {
        setOutcome('failed');
      }
    }
  }

  // reset each round
  useEffect(() => {
    if (logos && outcome !== 'ongoing') {
      if (outcome === 'completed') setScore((prev) => prev + 1);
      setCurrentIndex((prev) => prev - 1);
      setText('');
      setOutcome('ongoing');
    }
  }, [outcome]);

  function pickTech(rounds: number, techs: TechName[]): TechName[] {
    const gameIcons: TechName[] = [];
    while (gameIcons.length < rounds) {
      const randomTech = techs[Math.floor(Math.random() * techs.length)];
      if (!gameIcons.includes(randomTech)) gameIcons.push(randomTech);
    }
    return gameIcons;
  }

  function gimmeTechName(index: number): TechName | 'empty' {
    if (logos && logos[index]) return logos[index];
    return 'empty';
  }

  const winThreshold = 0.3 * quizRules.rounds;

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

  const delay = 20000;

  const renderer = ({
    seconds,
    milliseconds,
    completed,
  }: CountDownProps): JSX.Element => {
    const outerBarWidth = 10;
    const outerBarStyle = {
      width: `${outerBarWidth}em`,
      backgroundColor: 'blue',
      height: '1em',
    };
    const timeLeft = (seconds + milliseconds / 1000) / (delay / 1000);
    const currentWidth = timeLeft * outerBarWidth;

    const InnerBarStyle = {
      width: `${currentWidth}em`,
      backgroundColor: 'red',
      height: '1em',
      zIndex: 1,
    };
    if (completed) {
      // Render a completed state
      return <div>YOU SUCK</div>;
    }
    // Render a countdown
    return (
      <div className="outerBar" style={outerBarStyle}>
        {`${' '}`}
        <div className="innerBar" style={InnerBarStyle}>{`${' '}`}</div>
      </div>
    );
  };
  const memoizedCountdown = React.useMemo(() => {
    return (
      <Countdown
        date={Date.now() + delay}
        onComplete={() => console.log('')}
        intervalDelay={0}
        precision={2}
        renderer={renderer}
      />
    );
  }, [outcome]);

  return (
    <div className={styles.container}>
      {score}
      {/* <CountDownBar/> */}
      <TechLogo status="upcoming" techName={gimmeTechName(currentIndex - 1)} />
      <TechLogo status="current" techName={gimmeTechName(currentIndex)} />
      <TechLogo status={outcome} techName={gimmeTechName(currentIndex + 1)} />
      <form>
        <input
          value={text}
          type="text"
          placeholder="what is the tech?"
          onChange={(e) => {
            onTextchange(e.target.value);
          }}
        />
      </form>
      {memoizedCountdown}
    </div>
  );
};

export default QuizGame;
