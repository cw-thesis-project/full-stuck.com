import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { saveActivity, learnTech, newGame } from '../../store/thunks';
import usePageTitle from '../../shared/usePageTitle';
import styles from './TempNavBar.module.scss';

const TempNavBar = (): JSX.Element => {
  const userStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  usePageTitle('Full Stuck - Admin');

  const { isLoading, isAuthenticated, error, loginWithRedirect, logout } =
    useAuth0();
  const gettingUserData = useAppSelector((state) => state.loading);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  function SaveActivityThunk() {
    dispatch(saveActivity({ name: 'assessment', stars: 1, topic: 'git' }));
  }
  function LearnTechThunk() {
    dispatch(learnTech('debugging'));
  }

  function newGameButton() {
    if (userStore) {
      dispatch(newGame(userStore.username));
    }
  }

  if (isAuthenticated) {
    return (
      <div className={styles.container}>
        <p>
          username: {userStore?.username} level: {userStore?.gameData.level}
        </p>
        <p>history: {JSON.stringify(userStore?.gameData.history, null, 2)} </p>
        <p>history length: {userStore?.gameData.history.length || 0} </p>
        <p>
          {' '}
          techExperience:{' '}
          {JSON.stringify(userStore?.gameData?.techExperience, null, 2)}
        </p>
        <button
          type="button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log out
        </button>
        <Link to="/dashboard">
          <button type="button">Dashboard</button>
        </Link>
        <Link to="/schedule">
          <button type="button">Schedule</button>
        </Link>
        <Link to="/game/assessment">
          <button type="button">Assessment</button>
        </Link>
        <Link to="/game/memory">
          <button type="button">MemoryGame</button>
        </Link>
        <Link to="/assign-points">
          <button type="button">AssignPoints</button>
        </Link>
        {gettingUserData ? (
          <div>Getting your game history</div>
        ) : (
          <div>
            <button type="button" onClick={SaveActivityThunk}>
              SaveActivityThunk
            </button>
            <button type="button" onClick={LearnTechThunk}>
              LearnTechThunk
            </button>
            <button type="button" onClick={newGameButton}>
              NewGame (resets user profile!!!)
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button type="button" onClick={loginWithRedirect}>
      Log in
    </button>
  );
};

export default TempNavBar;
