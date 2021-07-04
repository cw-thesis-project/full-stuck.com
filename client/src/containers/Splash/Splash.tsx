import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import styles from './Splash.module.scss';
import usePageTitle from '../../shared/usePageTitle';

const Splash = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const history = useHistory();
  usePageTitle('Full Stuck');

  function handleButtonClick() {
    if (isAuthenticated) {
      history.push('/dashboard');
    } else {
      loginWithRedirect();
    }
  }

  const buttonText = isAuthenticated ? 'Dashboard' : 'Log in';

  return (
    <div className={styles.screen}>
      <div className={styles.logo}>
        <h1>F</h1>
        <h1>ULL</h1>
        <h1>_</h1>
        <h1>ST</h1>
        <h1>U</h1>
        <h1>CK</h1>
      </div>
      <p className={styles.subtitle}>
        Take part to the bootcamp, <br /> become CEO as quick as you can!
      </p>
      <button
        type="button"
        onClick={handleButtonClick}
        className={styles.button}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Splash;
