/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';
import classNames from 'classnames';
import styles from './CardComp.module.scss';
import { TechName } from '../../../shared/types';
import TechIcon from '../../TechIcon';

type CardState = 'down' | 'up' | 'matched';

export interface Card {
  name: TechName;
  state: CardState;
}

interface CardProps {
  card: Card;
  onCardClick(): void;
}

const CardComp = ({ card, onCardClick }: CardProps): JSX.Element => {
  const container = classNames({
    [styles.card]: true,
    [styles[card.state]]: true,
  });

  function handleClick() {
    if (card.state === 'down') {
      onCardClick();
    }
  }

  const cardContentMap: Record<CardState, JSX.Element> = {
    down: <h1>?</h1>,
    up: <TechIcon techName={card.name} iconSize="medium" isGray={false} />,
    matched: <TechIcon techName={card.name} iconSize="medium" isGray />,
  };

  return (
    <button type="button" onClick={handleClick} className={container}>
      {cardContentMap[card.state]}
    </button>
  );
};

export default CardComp;
