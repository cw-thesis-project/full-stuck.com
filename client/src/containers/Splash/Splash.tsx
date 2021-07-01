import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import styles from './Splash.module.scss';

const Splash = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const history = useHistory();

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
      <h1>FULL_STUCK</h1>
      <p>Take part to this bootcamp, Become CEO as quick as you can</p>
      <button type="button" onClick={handleButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Splash;
