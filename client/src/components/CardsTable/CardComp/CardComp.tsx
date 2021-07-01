/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

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
  const className = classNames({
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
    <div onClick={handleClick} className={className}>
      {cardContentMap[card.state]}
    </div>
  );
};

export default CardComp;
