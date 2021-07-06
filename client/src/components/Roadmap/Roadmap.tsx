import React from 'react';
import classNames from 'classnames';
import { Level } from '../../shared/types';
import { levelToNumber } from '../../shared/constants';
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

    return (
      <>
        <div className={wrapperClass} />
        <div className={blobClass} />
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
