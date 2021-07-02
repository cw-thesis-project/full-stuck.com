import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import * as dotenv from 'dotenv';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import { auth0 } from './shared/constants';
import { store } from './store';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={auth0.domain}
        clientId={auth0.clientId}
        redirectUri={auth0.redirectUri}
        audience={auth0.audience}
        scope="read:current_user update:current_user_metadata"
      >
        <Router>
          <App />
        </Router>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
