/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Level } from 'shared/types';
import { playSound } from 'services/audioService';
import { levelToNumber } from 'shared/constants';
import styles from './Roadmap.module.scss';

interface Props {
  userLevel: Level;
}

const Roadmap = ({ userLevel }: Props): JSX.Element => {
  const levels: Level[] = ['junior', 'senior', 'tutor', 'CEO'];

  const display = levels.map((level) => {
    const isFuture = levelToNumber[level] > levelToNumber[userLevel];
    const isCurrent = level === userLevel;

    const blobClass = classNames({
      [styles.blob]: true,
      [styles.future]: isFuture,
      [styles[level]]: true,
    });

    const levelClass = classNames({
      [styles.levelText]: true,
      [styles.current]: isCurrent,
      [styles[level]]: true,
    });

    const wrapperClass = classNames({
      [styles[level]]: true,
      [styles.wrapper]: true,
      [styles.current]: isCurrent,
    });

    let toPage = '/assign-points';

    if (level === 'CEO') {
      if (userLevel === 'CEO') {
        toPage = '/ceo';
      } else {
        toPage = '/game/snake';
      }
    }

    let blobTitle = level as string;

    if (level === 'CEO') {
      blobTitle = userLevel === 'CEO' ? 'ceo' : 'play snake';
    }

    return (
      <>
        <div className={wrapperClass} />
        <Link
          className={blobClass}
          to={toPage}
          title={blobTitle}
          onClick={() => playSound('buttonClick')}
        />
        <h3 className={levelClass}>{level}</h3>
      </>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.fullBar} />
      {display}
    </div>
  );
};

export default Roadmap;
