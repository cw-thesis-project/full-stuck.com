/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Auth0User } from 'shared/types';
import { getUserData } from 'store/thunks';
import { useAppDispatch } from 'store';
import { setAppLoading, createUserStore } from 'store/actions';
import { Loading } from 'components';
import { getToken } from '../../services/apiServices';
import styles from './App.module.scss';
import * as Containers from '../index';
import ProtectedRoute from './ProtectedRoute';
import TempNavBar from './TempNavBar';

const App = (): JSX.Element => {
  const { user, isLoading, getAccessTokenSilently, isAuthenticated } =
    useAuth0<Auth0User>();

  const dispatch = useAppDispatch();

  // updates the storage from the API on the first load.
  useEffect(() => {
    dispatch(setAppLoading(isLoading));
    if (!isLoading && user) {
      (async () => {
        dispatch(createUserStore(user));
        await getToken(getAccessTokenSilently);
        dispatch(getUserData(user));
      })();
    }
  }, [isLoading]);

  return (
    <div className={styles.container}>
      {isLoading ? <Loading /> : null}
      <Switch>
        {isAuthenticated ? (
          <ProtectedRoute path="/" component={Containers.Dashboard} exact />
        ) : (
          <Route path="/" component={Containers.Splash} exact />
        )}
        <ProtectedRoute path="/ceo" component={Containers.CEO} />
        <ProtectedRoute path="/schedule" component={Containers.Schedule} />
        <ProtectedRoute
          path="/assign-points"
          component={Containers.AssignPoints}
        />
        <ProtectedRoute
          path="/game/assessment"
          component={Containers.Assessment}
        />
        <ProtectedRoute path="/game/memory" component={Containers.MemoryGame} />
        <ProtectedRoute path="/game/snake" component={Containers.SnakeGame} />
        <ProtectedRoute path="/game/quiz" component={Containers.QuizGame} />
        <Route path="/hall-of-fame" component={Containers.HallOfFame} exact />
        <Route path="/admin">
          <TempNavBar />
        </Route>
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
