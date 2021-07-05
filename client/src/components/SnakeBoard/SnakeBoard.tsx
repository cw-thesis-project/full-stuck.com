/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './SnakeBoard.module.scss';

const SnakeBoard = ({
  isGameOver,
  setIsGameOver,
  points,
  setPoints,
}: any): JSX.Element => {
  const [dim, setDim] = useState<number>(0);
  const [chunk, setChunk] = useState<number>(0);
  const [direction, setDirection] = useState('right');
  const [fruit, setFruit] = useState<number>(26);

  const width: number = window.innerWidth;
  const speedRef = useRef(75);
  const [snake, setSnake] = useState<any>([
    {
      direction: 'right',
      part: [186, 185, 184, 183],
    },
  ]);

  const pieces = () => {
    // functionally label snake pieces (bang) and return
    const arr = [];
    for (let i = 0; i < 400; i++) {
      let addToArr = false;
      let j = 0;
      while (j < snake.length) {
        if (snake[j].part.indexOf(i) >= 0) {
          addToArr = true;
          break;
        } else {
          addToArr = false;
        }
        j++;
      }
      addToArr
        ? arr.push('bang')
        : i === fruit
        ? arr.push('fruit')
        : arr.push('');
    }
    return arr;
  };

  // handle direction changes
  const turn = useCallback(
    (dir: string, opp: string) => {
      const tempSnake: any = [...snake];
      if (direction !== opp && direction !== dir) {
        setDirection(dir);
        tempSnake.unshift({
          direction: dir,
          part: [],
        });
      }
      setSnake(tempSnake);
    },
    [snake, direction]
  );

  useEffect(() => {
    // determine relative dimensions of isGameOver portal
    if (width >= 800) {
      setDim(width * 0.35);
    } else if (width < 800) {
      setDim(width * 0.9);
    }
    setChunk(dim / 20);

    // points and get longer after eating
    if (snake[0].part[0] === fruit) {
      setPoints(points + 1);
      const sneak = [...snake];
      const firstSection = sneak[0];
      if (firstSection.direction === 'up') {
        const y = firstSection.part[0] - 20;
        if (y < 0) {
          firstSection.part.unshift(y + 400);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === 'right') {
        const y = firstSection.part[0] + 1;
        if (y % 20 === 0) {
          firstSection.part.unshift(y + -20);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === 'down') {
        const y = firstSection.part[0] + 20;
        if (y >= 400) {
          firstSection.part.unshift(y - 400);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === 'left') {
        const y = firstSection.part[0] - 1;
        if (y % 20 === 19) {
          firstSection.part.unshift(y + 20);
        } else {
          firstSection.part.unshift(y);
        }
      }
      speedRef.current -= 2;
      setSnake(sneak);
      setFruit(Math.floor(Math.random() * Math.floor(400)));
    }

    // isGameOverover if you eat your tail
    let totalArr: any[] = [];
    for (let k = 0; k < snake.length; k++) {
      totalArr = [...totalArr, ...snake[k].part];
    }
    const head = snake[0].part[0];
    totalArr.filter((item) => item === head).length >= 2 && setIsGameOver(true);

    if (!isGameOver) {
      // if isGameOverOVER pause events

      // listen for directions and update snake instructions accordingly
      const handleKeydown = (e: any) => {
        // let tempSnake: any = [...snake];
        switch (e.code) {
          case 'ArrowUp':
            e.preventDefault();
            turn('up', 'down');
            break;
          case 'ArrowRight':
            e.preventDefault();
            turn('right', 'left');
            break;
          case 'ArrowDown':
            e.preventDefault();
            turn('down', 'up');
            break;
          case 'ArrowLeft':
            e.preventDefault();
            turn('left', 'right');
            break;
        }
      };
      document.addEventListener('keydown', handleKeydown);

      // event interval
      const interval = setInterval(() => {
        // handle snake piece movement
        const dupSneak: any = [...snake];

        for (let i = snake.length - 1; i > 0; i--) {
          // increment through current snake and reduce to head direction
          if (dupSneak[i].part.length !== 0) {
            const next = dupSneak[i - 1];
            const chunk = dupSneak[i].part.shift();
            next.part.push(chunk);
          } else {
            dupSneak.pop();
          }
        }

        // perform movement changes to each chunk
        const sneak: any[] = dupSneak;
        sneak.map((section: any) => {
          if (section.direction === 'right') {
            section.part.map((x: number, i: number) => {
              const y = x + 1;
              if (y % 20 === 0) {
                return (section.part[i] = y - 20);
              }
              return (section.part[i] = y);
            });
          } else if (section.direction === 'up') {
            section.part.map((x: number, i: number) => {
              const y = x - 20;
              if (y < 0) {
                return (section.part[i] = y + 400);
              }
              return (section.part[i] = y);
            });
          } else if (section.direction === 'left') {
            section.part.map((x: number, i: number) => {
              const y = x - 1;
              if (y % 20 === 19) {
                return (section.part[i] = y + 20);
              }
              return (section.part[i] = y);
            });
          } else if (section.direction === 'down') {
            section.part.map((x: number, i: number) => {
              const y = x + 20;
              if (y >= 400) {
                return (section.part[i] = y - 400);
              }
              return (section.part[i] = y);
            });
          }
          return '';
        });
        setSnake(sneak);
      }, speedRef.current);

      // remove interval and listeners
      return () => {
        clearInterval(interval);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [turn, width, dim, chunk, snake, direction, points, fruit, isGameOver]);

  return (
    <div className={styles.snakeContainer}>
      <div
        className={styles.gameBorder}
        style={{
          width: dim,
          height: dim,
          backgroundColor: '#ebebeb',
        }}
      >
        {pieces().map((piece, i) => {
          return (
            <div
              key={`piece${i}`}
              style={
                piece === 'bang'
                  ? {
                      width: chunk,
                      height: chunk,
                      backgroundColor: '#248ec2',
                    }
                  : piece === 'fruit'
                  ? {
                      width: chunk,
                      height: chunk,
                      backgroundColor: '#1d355e',
                    }
                  : { width: chunk, height: chunk }
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default SnakeBoard;
