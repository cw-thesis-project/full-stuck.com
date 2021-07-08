import React from 'react';
import styles from './HallOfFame.module.scss';
import usePageTitle from '../../shared/usePageTitle';

const Splash = (): JSX.Element => {
  usePageTitle('Full Stuck − Hall of Fame');

  return <h1 className={styles.screen}>hall of fame</h1>;
};

export default Splash;
