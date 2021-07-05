/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { quizTechs, quizRules } from './helpers';
import styles from './QuizGame.module.scss';
import TechLogo from '../../components/TechLogo';
import { TechName } from '../../shared/types';

const QuizGame = (): JSX.Element => {
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

  // setOutcome on fail/success
  useEffect(() => {
    if (logos && text) {
      if (text.toLowerCase() === logos[currentIndex].toLowerCase()) {
        setOutcome('completed');
      }
      if (text[text.length - 1] !== logos[currentIndex][text.length - 1]) {
        setOutcome('failed');
      }
    }
  }, [text]);

  // change Index when outcome changes
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

  return (
    <div className={styles.container}>
      {score}
      <TechLogo status="upcoming" techName={gimmeTechName(currentIndex - 1)} />
      <TechLogo status="current" techName={gimmeTechName(currentIndex)} />
      <TechLogo status={outcome} techName={gimmeTechName(currentIndex + 1)} />
      <form>
        <input
          value={text}
          type="text"
          placeholder="what is the tech?"
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default QuizGame;
