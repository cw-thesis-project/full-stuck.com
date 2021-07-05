/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react';
import { deepCopy } from '../../shared/utils';

export interface Position {
  xPos: number;
  yPos: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ISnakeGame {
  isGameOver: boolean;
  score: number;
  board: Size;
  block: Size;
  snake: Position[];
  apple: Position;
  start(): void;
  stop(): void;
  handleKeyDown(event: KeyboardEvent): void;
}

function useMemoryGame(): ISnakeGame {
  const board = generateBoard();
  const block = generateBlock();
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState(generateSnake());
  const [apple, setApple] = useState(generateApple());
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameLoopTimeout, setGameLoopTimeout] = useState(50);
  const [direction, setDirection] = useState('right');
  const [directionChanged, setDirectionChanged] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>();

  function generateBoard(): Size {
    const percentageWidth = 50;
    const offsetWidth: number =
      document.getElementById('GameBoard')?.parentElement?.offsetWidth || 300;
    let width: number = offsetWidth * (percentageWidth / 100);
    width -= width % 30;
    if (width < 350) width = 350;
    const height = (width / 3) * 2;
    return { width, height };
  }

  function generateBlock(): Size {
    const width = board.width / 30;
    const height = board.height / 20;
    return { width, height };
  }

  function generateSnake(): Position[] {
    const startSnakeSize = 6;
    let xPos = board.width / 2;
    const yPos = board.height / 2;
    const snakeHead = { xPos: board.width / 2, yPos: board.height / 2 };
    const initialSnake = [];
    initialSnake.push(snakeHead);
    for (let i = 1; i < startSnakeSize; i += 1) {
      xPos -= block.width;
      const snakePart = { xPos, yPos };
      initialSnake.push(snakePart);
    }
    return initialSnake;
  }

  function generateApple(): Position {
    const applexPos =
      Math.floor(
        Math.random() * ((board.width - block.width) / block.width + 1)
      ) * block.width;
    let appleyPos =
      Math.floor(
        Math.random() * ((board.height - block.height) / block.height + 1)
      ) * block.height;
    while (appleyPos === snake[0].yPos) {
      appleyPos =
        Math.floor(
          Math.random() * ((board.height - block.height) / block.height + 1)
        ) * block.height;
    }
    return { xPos: applexPos, yPos: appleyPos };
  }
  // function goLeft(): void {
  //   const newDirection = direction === 'right' ? 'right' : 'left';
  //   setDirection(newDirection);
  // }

  // function goUp(): void {
  //   const newDirection = direction === 'down' ? 'down' : 'up';
  //   setDirection(newDirection);
  // }

  // function goRight(): void {
  //   const newDirection = direction === 'left' ? 'left' : 'right';
  //   setDirection(newDirection);
  // }

  // function goDown(): void {
  //   const newDirection = direction === 'up' ? 'up' : 'down';
  //   setDirection(newDirection);
  // }

  useEffect(() => {
    console.log(direction);

    moveHead(snake);
  }, [direction]);

  function handleKeyDown(event: KeyboardEvent): void {
    if (directionChanged) return;

    switch (event.keyCode) {
      case 37:
      case 65:
        setDirection('left');
        break;
      case 38:
      case 87:
        setDirection('up');
        break;
      case 39:
      case 68:
        setDirection('right');
        break;
      case 40:
      case 83:
        setDirection('down');
        break;
      default:
    }
    setDirectionChanged(true);
  }

  function moveHeadLeft(currSnake: Position[]): Position[] {
    console.log(currSnake);
    currSnake[0].xPos =
      currSnake[0].xPos <= 0
        ? board.width - block.width
        : currSnake[0].xPos - block.width;
    return currSnake;
  }

  function moveHeadUp(currSnake: Position[]): Position[] {
    currSnake[0].yPos =
      currSnake[0].yPos <= 0
        ? board.height - block.height
        : currSnake[0].yPos - block.height;
    return currSnake;
  }

  function moveHeadRight(currSnake: Position[]): Position[] {
    currSnake[0].xPos =
      currSnake[0].xPos >= board.width - block.width
        ? 0
        : currSnake[0].xPos + block.width;
    return currSnake;
  }

  function moveHeadDown(currSnake: Position[]): Position[] {
    currSnake[0].yPos =
      currSnake[0].yPos >= board.height - block.height
        ? 0
        : currSnake[0].yPos + block.height;
    return currSnake;
  }

  function moveHead(currSnake: Position[]): Position[] {
    console.log(direction);
    switch (direction) {
      case 'left':
        return moveHeadLeft(currSnake);
      case 'up':
        return moveHeadUp(currSnake);
      case 'right':
        return moveHeadRight(currSnake);
      default:
        return moveHeadDown(currSnake);
    }
  }

  function moveSnake(currSnake: Position[]): Position[] {
    // cons snakeCopy = deepCopy(currSnake);
    let snakeCopy = currSnake;
    let previousPartX = snakeCopy[0].xPos;
    let previousPartY = snakeCopy[0].yPos;
    let tmpPartX = previousPartX;
    let tmpPartY = previousPartY;
    snakeCopy = moveHead(snakeCopy);
    for (let i = 1; i < snakeCopy.length; i += 1) {
      tmpPartX = snakeCopy[i].xPos;
      tmpPartY = snakeCopy[i].yPos;
      snakeCopy[i].xPos = previousPartX;
      snakeCopy[i].yPos = previousPartY;
      previousPartX = tmpPartX;
      previousPartY = tmpPartY;
    }
    return snakeCopy;
  }

  function tryToEatSnake(): void {
    for (let i = 1; i < snake.length; i += 1) {
      if (snake[0].xPos === snake[i].xPos && snake[0].yPos === snake[i].yPos)
        setIsGameOver(true);
    }
  }

  function isAppleOnSnake(applexPos: number, appleyPos: number): boolean {
    for (let i = 0; i < snake.length; i += 1) {
      if (applexPos === snake[i].xPos && appleyPos === snake[i].yPos)
        return true;
    }
    return false;
  }

  function tryToEatApple(): void {
    // if the snake's head is on an apple
    if (snake[0].xPos === apple.xPos && snake[0].yPos === apple.yPos) {
      const newTail = { xPos: apple.xPos, yPos: apple.yPos };
      // increase snake size
      setSnake((currSnake: Position[]) => [newTail, ...currSnake]);

      const newApple: Position = { xPos: 0, yPos: 0 };
      // create another apple
      newApple.xPos =
        Math.floor(
          Math.random() * ((board.width - block.width) / block.width + 1)
        ) * block.width;
      newApple.yPos =
        Math.floor(
          Math.random() * ((board.height - block.height) / block.height + 1)
        ) * block.height;
      while (isAppleOnSnake(newApple.xPos, newApple.yPos)) {
        const xPos =
          Math.floor(
            Math.random() * ((board.width - block.width) / block.width + 1)
          ) * block.width;
        const yPos =
          Math.floor(
            Math.random() * ((board.height - block.height) / block.height + 1)
          ) * block.height;
        setApple({ xPos, yPos });
      }

      // decrease the game loop timeout
      if (gameLoopTimeout > 25)
        setGameLoopTimeout((currGameLoopTimeout) => currGameLoopTimeout - 0.5);

      setScore((currScore) => currScore + 1);
    }
  }

  function start(): void {
    const tId = setTimeout(() => {
      if (!isGameOver) {
        setSnake((currSnake) => moveSnake(currSnake));
        tryToEatSnake();
        tryToEatApple();
        setDirectionChanged(false);
      }
      start();
    }, gameLoopTimeout);

    setTimeoutId(tId);
  }

  function stop(): void {
    return clearTimeout(timeoutId);
  }

  return {
    start,
    stop,
    isGameOver,
    score,
    board,
    block,
    handleKeyDown,
    snake,
    apple,
  };
}

export default useMemoryGame;
