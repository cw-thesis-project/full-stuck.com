import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { saveActivity, learnTech } from '../../store/thunks';

const TempNavBar = (): JSX.Element => {
  const userStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { isLoading, isAuthenticated, error, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  function SaveActivityThunk() {
    // eslint-disable-next-line no-console
    console.log('SaveActivityThunk');
    dispatch(saveActivity({ name: 'assessment', stars: 1, topic: 'git' }));
  }
  function LearnTechThunk() {
    // eslint-disable-next-line no-console
    console.log('LearnTechThunk');
    dispatch(learnTech('debugging'));
  }

  if (isAuthenticated) {
    return (
      <div>
        <p>
          username: {userStore?.username} level: {userStore?.gameData.level}
        </p>
        <p>history: {JSON.stringify(userStore?.gameData.history, null, 2)} </p>
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
        <button type="button" onClick={SaveActivityThunk}>
          SaveActivityThunk
        </button>
        <button type="button" onClick={LearnTechThunk}>
          LearnTechThunk
        </button>
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
