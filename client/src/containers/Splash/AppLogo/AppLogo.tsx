import React from 'react';
import styles from './AppLogo.module.scss';

const AppLogo = (): JSX.Element => {
  return (
    <div className={styles.logo}>
      <h1 className={styles.logoPart}>F</h1>
      <h1 className={styles.logoPart}>ULL</h1>
      <h1 className={styles.logoPart}>_</h1>
      <h1 className={styles.logoPart}>ST</h1>
      <h1 className={styles.logoPart}>U</h1>
      <h1 className={styles.logoPart}>CK</h1>
    </div>
  );
};

export default AppLogo;
