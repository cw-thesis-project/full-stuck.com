/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';
import styles from './CardsTable.module.scss';
import CardComp, { Card } from './CardComp/CardComp';

interface Props {
  cards: Card[];
  onCardClick(index: number): void;
}

const CardsTable = ({ cards, onCardClick }: Props): JSX.Element => {
  return (
    <div>
      <div className={styles.container}>
        {cards.map((card: Card, i) => (
          <CardComp card={card} onCardClick={() => onCardClick(i)} key={i} />
        ))}
      </div>
    </div>
  );
};

export default CardsTable;
