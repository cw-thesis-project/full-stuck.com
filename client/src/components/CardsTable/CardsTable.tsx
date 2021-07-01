/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import styles from './CardsTable.module.scss';
import useMemoryGame from '../../containers/MemoryGame/useMemoryGame';
import CardComp from './CardComp';

const CardsTable = (): JSX.Element => {
  const { cards, handleCardChoice } = useMemoryGame();

  return (
    <div>
      <div className={styles.container}>
        {cards.map((card, i) => (
          <CardComp card={card} onClick={() => handleCardChoice(i)} />
        ))}
      </div>
    </div>
  );
};

export default CardsTable;
