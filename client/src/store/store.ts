import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import {
  getUserData,
  learnTech,
  saveActivity,
  newGame,
  updateUser,
  changeActivityTopic,
} from '../services/apiServices';
import { reducer } from './reducer';
import { ApiService, AppState, AppAction } from './storeTypes';

const apiService: ApiService = {
  learnTech: (techName, user) => learnTech(techName, user),
  saveActivity: (activity, user) => saveActivity(activity, user),
  getUserData: (auth0User) => getUserData(auth0User),
  newGame: (auth0User) => newGame(auth0User),
  updateUser: (user) => updateUser(user),
  changeActivityTopic: (techName, user) => changeActivityTopic(techName, user),
};

const thunkMiddleware = thunk.withExtraArgument(apiService);

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware as ThunkMiddleware<AppState, AppAction, ApiService>
  )
);
