import React from 'react';
import { TechName } from '../../shared/types';
import styles from './QuizGame.module.scss';

export const quizTechs: TechName[] = [
  'javascript',
  'git',
  'graphql',
  'react',
  'rxjs',
  'typescript',
];

interface QuizRules {
  rounds: number;
  threshold: number;
  countdownDuration: number;
}

export const quizRules: QuizRules = {
  rounds: 5,
  threshold: 0.3,
  countdownDuration: 10000,
};

interface CountDownProps {
  milliseconds: number;
  seconds: number;
  completed: boolean;
}

export const renderer = ({
  seconds,
  milliseconds,
  completed,
}: CountDownProps): JSX.Element => {
  const outerBarWidth = 20;
  const outerBarStyle = {
    width: `${outerBarWidth}em`,
  };
  const timeLeft =
    (seconds + milliseconds / 1000) / (quizRules.countdownDuration / 1000);
  const currentWidth = timeLeft * outerBarWidth;

  const InnerBarStyle = {
    width: `${currentWidth}em`,
  };
  if (completed) {
    return <div>YOU SUCK</div>;
  }

  return (
    <div className={styles.outerBar} style={outerBarStyle}>
      {`${' '}`}
      <div className={styles.innerBar} style={InnerBarStyle}>{`${' '}`}</div>
    </div>
  );
};

export const pickTech = (rounds: number, techs: TechName[]): TechName[] => {
  const gameIcons: TechName[] = [];
  while (gameIcons.length < rounds) {
    const randomTech = techs[Math.floor(Math.random() * techs.length)];
    if (!gameIcons.includes(randomTech)) gameIcons.push(randomTech);
    // gameIcons.push(randomTech);
  }
  return gameIcons;
};
