/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { playSound } from 'services/audioService';
import styles from './CardsTable.module.scss';
import CardComp, { Card } from '../CardComp';

interface Props {
  cards: Card[];
  onCardClick(index: number): void;
}

const CardsTable = ({ cards, onCardClick }: Props): JSX.Element => {
  function handleCardClick(index: number): void {
    onCardClick(index);
    playSound('cardFlip');
  }

  return (
    <div>
      <div className={styles.container}>
        {cards.map((card: Card, i) => (
          <CardComp
            card={card}
            onCardClick={() => handleCardClick(i)}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsTable;
