import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { useParams } from 'react-router-dom';

function TempAuth(): any {
  // const { loginOK } = useParams();
  // if (loginOK) {
  //   console.log('login successful');
  // }

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
        <h2>
          Log in as: {username} {user?.email}
        </h2>
        <button
          type="button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log out
        </button>
      </div>
    );
  }
  return (
    <button type="button" onClick={loginWithRedirect}>
      Log in
    </button>
  );
}

export default TempAuth;
