import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const TempNavBar = (): JSX.Element => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    const username = user?.['https://full-stuck.com/username'];
    return (
      <div>
        <p>Logged as: {username}</p>
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
