import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CEO.module.scss';
import { useAppSelector } from '../../store';

const CEO = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    return <div>no user?</div>;
  }

  const subtitle =
    user.gameData.level === 'CEO' ? 'you are done!' : 'not yet the boss';

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>CEO</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <Link to="/dashboard" className={styles.button}>
        Dashboard
      </Link>
    </div>
  );
};

export default CEO;
