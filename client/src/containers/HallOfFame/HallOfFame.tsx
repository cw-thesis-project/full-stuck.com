import React from 'react';
import usePageTitle from 'shared/usePageTitle';
import styles from './HallOfFame.module.scss';

const Splash = (): JSX.Element => {
  usePageTitle('Full Stuck − Hall of Fame');

  return <h1 className={styles.screen}>hall of fame</h1>;
};

export default Splash;
