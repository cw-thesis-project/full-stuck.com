/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import styles from './CardComp.module.scss';
import { TechName } from '../../../shared/types';
import TechIcon from '../../TechIcon';

export interface Card {
  name: TechName;
  state: 'down' | 'up' | 'matched';
}

interface CardProps {
  card: Card;
  onCardClick(): void;
}

const CardComp = ({ card, onCardClick }: CardProps): JSX.Element => {
  const className = `${styles.card} ${styles[card.state]}`;

  function handleClick() {
    if (card.state === 'down') {
      onCardClick();
    }
  }

  switch (card.state) {
    case 'down':
    default:
      return (
        <div onClick={handleClick} className={className}>
          <h1>?</h1>
        </div>
      );

    case 'up':
      return (
        <div onClick={handleClick} className={className}>
          <TechIcon techName={card.name} iconSize="medium" isGray={false} />
          <div>{card.name}</div>
        </div>
      );

    case 'matched':
      return <div className={styles.matched} />;
  }
};

export default CardComp;
