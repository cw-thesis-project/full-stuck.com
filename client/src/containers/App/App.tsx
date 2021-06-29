import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Splash from '../Splash/Splash';
import Dashboard from '../Dashboard/Dashboard';
import Schedule from '../Schedule/Schedule';
import AssignPoints from '../AssignPoints/AssignPoints';
import Assessment from '../Assessment/Assessment';
import MemoryGame from '../MemoryGame/MemoryGame';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const App = (): JSX.Element => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Splash} exact />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/schedule" component={Schedule} />
        <ProtectedRoute path="/assign-points" component={AssignPoints} />
        <ProtectedRoute path="/game/assessment" component={Assessment} />
        <ProtectedRoute path="/game/memory" component={MemoryGame} />
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
