import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { reducer } from './reducer';
import { ApiService, AppState, AppAction } from './storeTypes';

// TODO: link to actual apiService when done
const apiService: ApiService = {
  learnTech: (techName, user, token) => undefined,
  saveActivity: (activity, user, token) => undefined,
};

const thunkMiddleware = thunk.withExtraArgument(apiService);

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware as ThunkMiddleware<AppState, AppAction, ApiService>
  )
);
