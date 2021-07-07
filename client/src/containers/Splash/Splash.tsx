import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './Splash.module.scss';
import usePageTitle from '../../shared/usePageTitle';
import useSplashAnimations from './useSplashAnimations';

const Splash = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  usePageTitle('Full Stuck');
  useSplashAnimations();

  const buttonText = isAuthenticated ? 'Dashboard' : 'Log in';

  return (
    <div className={styles.screen}>
      <div className={styles.logo}>
        <h1 className={styles.logoPart}>F</h1>
        <h1 className={styles.logoPart}>ULL</h1>
        <h1 className={styles.logoPart}>_</h1>
        <h1 className={styles.logoPart}>ST</h1>
        <h1 className={styles.logoPart}>U</h1>
        <h1 className={styles.logoPart}>CK</h1>
      </div>
      <p className={styles.subtitle}>
        Take part to the bootcamp, <br /> become CEO as quick as you can!
      </p>
      <button
        type="button"
        onClick={loginWithRedirect}
        className={styles.button}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Splash;
