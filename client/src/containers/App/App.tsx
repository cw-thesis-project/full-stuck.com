import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getToken } from '../../services/apiServices';
import { getUserData } from '../../store/thunks';
import { useAppDispatch, useAppSelector } from '../../store';
import styles from './App.module.scss';
import Splash from '../Splash/Splash';
import Dashboard from '../Dashboard/Dashboard';
import Schedule from '../Schedule/Schedule';
import AssignPoints from '../AssignPoints/AssignPoints';
import Assessment from '../Assessment/Assessment';
import MemoryGame from '../MemoryGame/MemoryGame';
import CEO from '../CEO/CEO';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import TempNavBar from '../../components/TempNavBar/TempNavBar';
import SnakeGame from '../SnakeGame/SnakeGame';
import QuizGame from '../QuizGame/QuizGame';

const App = (): JSX.Element => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const userStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // updates the storage from the API on the first load.
  useEffect(() => {
    if (!isLoading && !userStore) {
      (async () => {
        await getToken(getAccessTokenSilently);
        const username: string = user?.['https://full-stuck.com/username'];
        dispatch(getUserData(username));
      })();
    }
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <Switch>
        <Route path="/" component={Splash} exact />
        <ProtectedRoute path="/ceo" component={CEO} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/schedule" component={Schedule} />
        <ProtectedRoute path="/assign-points" component={AssignPoints} />
        <ProtectedRoute path="/game/assessment" component={Assessment} />
        <ProtectedRoute path="/game/memory" component={MemoryGame} />
        <ProtectedRoute path="/game/snake" component={SnakeGame} />
        <ProtectedRoute path="/game/quiz" component={QuizGame} />
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
