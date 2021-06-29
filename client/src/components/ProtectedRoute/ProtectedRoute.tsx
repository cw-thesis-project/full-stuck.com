import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ path, component }: RouteProps): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>loading authetication</div>;
  }
  if (isAuthenticated) {
    return <Route path={path} component={component} exact />;
  }
  return <Redirect to="/" />;
};

export default ProtectedRoute;
