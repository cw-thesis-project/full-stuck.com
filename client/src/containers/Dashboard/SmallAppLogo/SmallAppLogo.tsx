/* eslint-disable import/no-unresolved */
import React from 'react';
import styles from './SmallAppLogo.module.scss';

const SmallAppLogo = (): JSX.Element => {
  return (
    <div className={styles.logo}>
      <div className={styles.row}>
        <h1 className={styles.accent}>F</h1>
        <h1>U</h1>
        <h1>L</h1>
        <h1>L</h1>
        <h1 className={styles.accent}>_</h1>
      </div>
      <div className={styles.row}>
        <h1>S</h1>
        <h1>T</h1>
        <h1 className={styles.accent}>U</h1>
        <h1>C</h1>
        <h1>K</h1>
      </div>
    </div>
  );
};

export default SmallAppLogo;
