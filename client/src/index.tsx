import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import * as dotenv from 'dotenv';
import App from './containers/App/App';
import TempNavBar from './components/TempNavBar/TempNavBar';
import { auth0 } from './constants';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      redirectUri={auth0.redirectUri}
      audience={auth0.audience}
      scope="read:current_user update:current_user_metadata"
    >
      <Router>
        <TempNavBar />
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
