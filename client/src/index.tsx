import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import * as dotenv from 'dotenv';
import App from './components/App/App';
import TempAuth from './components/TempAuth/TempAuth';
import { auth0 } from './constants';

dotenv.config();

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/auth/:loginOK" component={TempAuth} />
        <Route path="/auth" component={TempAuth} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      redirectUri={auth0.redirectUri}
      audience={auth0.audience}
      scope="read:current_user update:current_user_metadata"
    >
      <Routing />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
