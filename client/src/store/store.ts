import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { getUserData, learnTech, saveActivity } from '../services/apiServices';
import { reducer } from './reducer';
import { ApiService, AppState, AppAction } from './storeTypes';

const apiService: ApiService = {
  learnTech: (techName, user) => learnTech(techName, user),
  saveActivity: (activity, user) => saveActivity(activity, user),
  getUserData: (username) => {
    return getUserData(username);
  },
};

const thunkMiddleware = thunk.withExtraArgument(apiService);

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware as ThunkMiddleware<AppState, AppAction, ApiService>
  )
);
