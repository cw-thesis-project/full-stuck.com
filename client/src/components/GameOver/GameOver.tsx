import React from 'react';
import { Link } from 'react-router-dom';
import { StarsCount } from '../../shared/types';
import styles from './GameOver.module.scss';
import StarsRow from '../StarsRow';

interface Props {
  starsCount: StarsCount;
  showStars?: boolean;
}

const GameOver = ({ starsCount, showStars }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      {showStars && (
        <div className={styles.starsRow}>
          <StarsRow isBig starsCount={starsCount} />
        </div>
      )}
      <h1 className={styles.title}>{starsCount ? 'You won!' : 'You lost!'}</h1>
      {starsCount ? (
        <h2 className={styles.subtitle}>
          Keep on going, <br />
          you are awesome.
        </h2>
      ) : (
        <div className={styles.subtitle}>
          <div>...cannot</div>
          <div>even center a</div>
          <div className={styles.failed}>{'<div>'}</div>
        </div>
      )}
      <Link className={styles.button} to="/assign-points">
        {starsCount ? 'git push' : '--no-verify'}
      </Link>
    </div>
  );
};

GameOver.defaultProps = {
  showStars: false,
};

export default GameOver;
