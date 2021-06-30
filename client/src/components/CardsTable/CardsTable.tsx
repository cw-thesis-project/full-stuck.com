import React from 'react';
import styles from './CardsTable.module.scss';
import { TechName } from '../../shared/types';

interface Card {
  name: TechName;
  state: 'down' | 'up' | 'matched';
}

interface Props {
  cards: Card[];
  onCardClick(index: number): void;
}

const CardsTable = ({ cards, onCardClick }: Props): JSX.Element => {
  return <div />;
};

export default CardsTable;
