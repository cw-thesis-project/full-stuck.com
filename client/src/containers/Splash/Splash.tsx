/* eslint-disable import/no-unresolved */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import usePageTitle from 'shared/usePageTitle';
import AppLogo from './AppLogo';
import styles from './Splash.module.scss';
import useSplashAnimations from './useSplashAnimations';

const Splash = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  usePageTitle('Full Stuck');
  useSplashAnimations();

  const buttonText = isAuthenticated ? 'Dashboard' : 'Log in';

  return (
    <div className={styles.screen}>
      <AppLogo />
      <p className={styles.subtitle}>
        Take part in the bootcamp, <br /> become CEO as quick as you can!
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
