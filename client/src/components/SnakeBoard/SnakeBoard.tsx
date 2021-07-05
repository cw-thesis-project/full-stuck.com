/* eslint-disable react/sort-comp */
import React from 'react';
import styles from './SnakeBoard.module.scss';

interface Props {
  board: { height: number; width: number };
  block: { height: number; width: number };
  snake: { xPos: number; yPos: number }[];
  apple: { xPos: number; yPos: number };
}

const SnakeBoard = ({ board, snake, block, apple }: Props): JSX.Element => {
  return (
    <div
      id="GameBoard"
      className={styles.gameboard}
      style={{
        width: board.width,
        height: board.height,
      }}
    >
      {snake?.map((snakePart: { xPos: number; yPos: number }) => {
        return (
          <div
            className={styles.block}
            style={{
              width: block.width,
              height: block.height,
              left: snakePart.xPos,
              top: snakePart.yPos,
              background: '#666',
            }}
          />
        );
      })}
      <div
        className={styles.block}
        style={{
          width: block.width,
          height: block.height,
          left: apple.xPos,
          top: apple.yPos,
          background: '#000',
        }}
      />
    </div>
  );
};

export default SnakeBoard;
