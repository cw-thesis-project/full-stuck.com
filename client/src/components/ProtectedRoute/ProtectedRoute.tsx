import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ path, component }: RouteProps): JSX.Element => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Route path={path} component={component} exact />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
