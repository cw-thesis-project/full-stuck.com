/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import styles from './CardComp.module.scss';
import { TechName } from '../../../shared/types';
import TechIcon from '../../TechIcon';

interface Card {
  name: TechName;
  state: 'down' | 'up' | 'matched';
}

interface CardProps {
  card: Card;
  onClick(): void;
}

const CardComp = ({ card, onClick }: CardProps): JSX.Element => {
  const className = `${styles.card} ${styles[card.state]}`;

  function handleClick() {
    if (card.state === 'down') {
      onClick();
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
