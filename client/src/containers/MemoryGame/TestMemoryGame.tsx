/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import useMemoryGame, { Card } from './useMemoryGame';
import styles from './MemoryGame.module.scss';

const TestMemoryGame = (): JSX.Element => {
  const { cards, handleCardChoice } = useMemoryGame();

  return (
    <div>
      <div className={styles.cardsGrid}>
        {cards.map((card, i) => (
          <CardComp card={card} onClick={() => handleCardChoice(i)} />
        ))}
      </div>
    </div>
  );
};

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

  return (
    <div onClick={handleClick} className={className}>
      <div>{card.name}</div>
      <div>{card.state}</div>
    </div>
  );
};

export default TestMemoryGame;
