import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { trophy } from 'assets/icons';
import { useAppSelector } from 'store';
import styles from './CEO.module.scss';

const CEO = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  if (!user || user.gameData.level !== 'CEO') {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.screen}>
      <div className={styles.congratsContainer}>
        <h2>Well done,</h2>
        <h2 className={styles.accent}>{user.username}</h2>
      </div>
      <Link to="/hall-of-fame" title="hall of fame">
        <img className={styles.trophyIcon} src={trophy} alt="trophy icon" />
      </Link>
      <h1 className={styles.title}>CEO!</h1>
      <Link to="/dashboard" className={styles.button}>
        Dashboard
      </Link>
    </div>
  );
};

export default CEO;
