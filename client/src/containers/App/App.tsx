import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Auth0User } from 'shared/types';
import { getUserData } from 'store/thunks';
import { useAppDispatch } from 'store';
import { setAppLoading, createUserStore } from 'store/actions';
import { getToken } from '../../services/apiServices';
import styles from './App.module.scss';
import Splash from '../Splash/Splash';
import Dashboard from '../Dashboard/Dashboard';
import Schedule from '../Schedule/Schedule';
import AssignPoints from '../AssignPoints/AssignPoints';
import Assessment from '../Assessment/Assessment';
import MemoryGame from '../MemoryGame/MemoryGame';
import CEO from '../CEO/CEO';
import HallOfFame from '../HallOfFame';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import TempNavBar from '../../components/TempNavBar/TempNavBar';
import SnakeGame from '../SnakeGame/SnakeGame';
import QuizGame from '../QuizGame/QuizGame';
import Loading from '../../components/Loading';

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
          <ProtectedRoute path="/" component={Dashboard} exact />
        ) : (
          <Route path="/" component={Splash} exact />
        )}
        <ProtectedRoute path="/ceo" component={CEO} />
        <ProtectedRoute path="/schedule" component={Schedule} />
        <ProtectedRoute path="/assign-points" component={AssignPoints} />
        <ProtectedRoute path="/game/assessment" component={Assessment} />
        <ProtectedRoute path="/game/memory" component={MemoryGame} />
        <ProtectedRoute path="/game/snake" component={SnakeGame} />
        <ProtectedRoute path="/game/quiz" component={QuizGame} />
        <Route path="/hall-of-fame" component={HallOfFame} exact />
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
