import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import {
  getUserData,
  learnTech,
  saveActivity,
  newGame,
  updateUser,
} from '../services/apiServices';
import { reducer } from './reducer';
import { ApiService, AppState, AppAction } from './storeTypes';

const apiService: ApiService = {
  learnTech: (techName, user) => learnTech(techName, user),
  saveActivity: (activity, user) => saveActivity(activity, user),
  getUserData: (username) => getUserData(username),
  newGame: (username) => newGame(username),
  updateUser: (user) => updateUser(user),
};

const thunkMiddleware = thunk.withExtraArgument(apiService);

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware as ThunkMiddleware<AppState, AppAction, ApiService>
  )
);
