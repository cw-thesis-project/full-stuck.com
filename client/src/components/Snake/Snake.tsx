/* eslint-disable react/sort-comp */
import React from 'react';
import styles from './Snake.module.scss';

class SnakeGame extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      width: 0,
      height: 0,
      blockWidth: 0,
      blockHeight: 0,
      gameLoopTimeout: 50,
      timeoutId: 0,
      snake: [],
      apple: {},
      direction: 'right',
      directionChanged: false,
      isGameOver: false,
      score: 0,
    };
  }

  componentDidMount() {
    this.initGame();
    window.addEventListener('keydown', this.handleKeyDown);
    this.gameLoop();
  }

  initGame(): void {
    // Game size initialization
    const percentageWidth = 40;
    const offsetWidth: any =
      document.getElementById('GameBoard')?.parentElement?.offsetWidth;
    let width: number = offsetWidth * (percentageWidth / 100);
    width -= width % 30;
    if (width < 30) width = 30;
    const height = (width / 3) * 2;
    const blockWidth = width / 30;
    const blockHeight = height / 20;

    // snake initialization
    const startSnakeSize = 6;
    const snake = [];
    let Xpos = width / 2;
    const Ypos = height / 2;
    const snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);
    for (let i = 1; i < startSnakeSize; i += 1) {
      Xpos -= blockWidth;
      const snakePart = { Xpos, Ypos };
      snake.push(snakePart);
    }

    // apple position initialization
    const appleXpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth;
    let appleYpos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight;
    while (appleYpos === snake[0].Ypos) {
      appleYpos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
    }

    this.setState({
      width,
      height,
      blockWidth,
      blockHeight,
      snake,
      apple: { Xpos: appleXpos, Ypos: appleYpos },
    });
  }

  gameLoop(): void {
    const { gameLoopTimeout } = this.state;
    const { isGameOver } = this.state;
    const timeoutId = setTimeout(() => {
      if (!isGameOver) {
        this.moveSnake();
        this.tryToEatSnake();
        this.tryToEatApple();
        this.setState({ directionChanged: false });
      }

      this.gameLoop();
    }, gameLoopTimeout);

    this.setState({ timeoutId });
  }

  componentWillUnmount() {
    const { timeoutId } = this.state;
    clearTimeout(timeoutId);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  moveSnake(): void {
    const { snake } = this.state;
    let previousPartX = snake[0].Xpos;
    let previousPartY = snake[0].Ypos;
    let tmpPartX = previousPartX;
    let tmpPartY = previousPartY;
    this.moveHead();
    for (let i = 1; i < snake.length; i += 1) {
      tmpPartX = snake[i].Xpos;
      tmpPartY = snake[i].Ypos;
      snake[i].Xpos = previousPartX;
      snake[i].Ypos = previousPartY;
      previousPartX = tmpPartX;
      previousPartY = tmpPartY;
    }
    this.setState({ snake });
  }

  tryToEatApple(): void {
    const { snake, apple, score } = this.state;

    // if the snake's head is on an apple
    if (snake[0].Xpos === apple.Xpos && snake[0].Ypos === apple.Ypos) {
      const { width } = this.state;
      const { height } = this.state;
      const { blockWidth } = this.state;
      const { blockHeight } = this.state;
      const newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos };
      const { highScore } = this.state;
      const { newHighScore } = this.state;
      let { gameLoopTimeout } = this.state;

      // increase snake size
      snake.push(newTail);

      // create another apple
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth;
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
      while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
        apple.Xpos =
          Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
          blockWidth;
        apple.Ypos =
          Math.floor(
            Math.random() * ((height - blockHeight) / blockHeight + 1)
          ) * blockHeight;
      }

      // decrease the game loop timeout
      if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5;

      this.setState({
        snake,
        apple,
        score: score + 1,
        highScore,
        newHighScore,
        gameLoopTimeout,
      });
    }
  }

  tryToEatSnake(): void {
    const { snake } = this.state;

    for (let i = 1; i < snake.length; i += 1) {
      if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos)
        this.setState({ isGameOver: true });
    }
  }

  isAppleOnSnake(appleXpos: any, appleYpos: any): boolean {
    const { snake } = this.state;
    for (let i = 0; i < snake.length; i += 1) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
        return true;
    }
    return false;
  }

  moveHead(): void {
    const { direction } = this.state;
    switch (direction) {
      case 'left':
        this.moveHeadLeft();
        break;
      case 'up':
        this.moveHeadUp();
        break;
      case 'right':
        this.moveHeadRight();
        break;
      default:
        this.moveHeadDown();
    }
  }

  moveHeadLeft(): void {
    const { width } = this.state;
    const { blockWidth } = this.state;
    const { snake } = this.state;
    snake[0].Xpos =
      snake[0].Xpos <= 0 ? width - blockWidth : snake[0].Xpos - blockWidth;
    this.setState({ snake });
  }

  moveHeadUp(): void {
    const { height } = this.state;
    const { blockHeight } = this.state;
    const { snake } = this.state;
    snake[0].Ypos =
      snake[0].Ypos <= 0 ? height - blockHeight : snake[0].Ypos - blockHeight;
    this.setState({ snake });
  }

  moveHeadRight(): void {
    const { width } = this.state;
    const { blockWidth } = this.state;
    const { snake } = this.state;
    snake[0].Xpos =
      snake[0].Xpos >= width - blockWidth ? 0 : snake[0].Xpos + blockWidth;
    this.setState({ snake });
  }

  moveHeadDown(): void {
    const { height } = this.state;
    const { blockHeight } = this.state;
    const { snake } = this.state;
    snake[0].Ypos =
      snake[0].Ypos >= height - blockHeight ? 0 : snake[0].Ypos + blockHeight;
    this.setState({ snake });
  }

  handleKeyDown(event: any): void {
    const { directionChanged } = this.state;

    if (directionChanged) return;

    switch (event.keyCode) {
      case 37:
      case 65:
        this.goLeft();
        break;
      case 38:
      case 87:
        this.goUp();
        break;
      case 39:
      case 68:
        this.goRight();
        break;
      case 40:
      case 83:
        this.goDown();
        break;
      default:
    }
    this.setState({ directionChanged: true });
  }

  goLeft(): void {
    const { direction } = this.state;
    const newDirection = direction === 'right' ? 'right' : 'left';
    this.setState({ direction: newDirection });
  }

  goUp(): void {
    const { direction } = this.state;
    const newDirection = direction === 'down' ? 'down' : 'up';
    this.setState({ direction: newDirection });
  }

  goRight(): void {
    const { direction } = this.state;
    const newDirection = direction === 'left' ? 'left' : 'right';
    this.setState({ direction: newDirection });
  }

  goDown(): void {
    const { direction } = this.state;
    const newDirection = direction === 'up' ? 'up' : 'down';
    this.setState({ direction: newDirection });
  }

  render(): JSX.Element {
    const { isGameOver, width, height, snake, blockWidth, blockHeight, apple } =
      this.state;
    // Game over
    if (isGameOver) {
      // do something
    }

    return (
      <div
        id="GameBoard"
        className={styles.gameboard}
        style={{
          width,
          height,
          borderWidth: width / 50,
        }}
      >
        {snake.map((snakePart: any) => {
          return (
            <div
              className={styles.block}
              style={{
                width: blockWidth,
                height: blockHeight,
                left: snakePart.Xpos,
                top: snakePart.Ypos,
                background: '#666',
              }}
            />
          );
        })}
        <div
          className={styles.block}
          style={{
            width: blockWidth,
            height: blockHeight,
            left: apple.Xpos,
            top: apple.Ypos,
            background: '#000',
          }}
        />
      </div>
    );
  }
}

export default SnakeGame;
