import { ThunkAction } from 'redux-thunk';
import { PastActivity, TechName, User } from '../shared/types';

export interface AppState {
  pointsToAssign: number;
  user: User | null;
  loading: boolean;
  error: Error | string;
}

export type AppAction =
  | SaveActivityRequestAction
  | SaveActivitySuccessAction
  | LearnTechRequestAction
  | LearnTechSuccessAction
  | SetPointsToAssignAction
  | DecreasePointsToAssignAction
  | NewGameRequestAction
  | NewGameSuccessAction
  | GetUserDataRequestAction
  | GetUserDataSuccessAction
  | ResetErrorAction
  | FailureAction;

export interface ApiService {
  learnTech(techName: TechName, user: User): Promise<User | null>;
  saveActivity(activity: PastActivity, user: User): Promise<User | null>;
  newGame(username: string): Promise<User | null>;
  getUserData(username: string): Promise<User | null>;
}

// see https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
export type Thunk = ThunkAction<
  void | Promise<unknown>,
  AppState,
  ApiService,
  AppAction
>;

// actions interfaces

interface SaveActivityRequestAction {
  type: typeof SAVE_ACTIVITY_REQUEST;
  activity: PastActivity;
}

interface SaveActivitySuccessAction {
  type: typeof SAVE_ACTIVITY_SUCCESS;
  user: User;
}

interface LearnTechRequestAction {
  type: typeof LEARN_TECH_REQUEST;
  techName: TechName;
}

interface LearnTechSuccessAction {
  type: typeof LEARN_TECH_SUCCESS;
  user: User;
}

interface SetPointsToAssignAction {
  type: typeof SET_POINTS_TO_ASSIGN;
  amount: number;
}

interface DecreasePointsToAssignAction {
  type: typeof DECREASE_POINTS_TO_ASSIGN;
}

interface GetUserDataSuccessAction {
  type: typeof GET_USER_DATA_SUCCESS;
  user: User;
}

interface GetUserDataRequestAction {
  type: typeof GET_USER_DATA_REQUEST;
  username: string;
}

// new game

interface NewGameRequestAction {
  type: typeof NEW_GAME_REQUEST;
  username: string;
}

interface NewGameSuccessAction {
  type: typeof NEW_GAME_SUCCESS;
  user: User;
}

interface ResetErrorAction {
  type: typeof RESET_ERROR;
}

export interface FailureAction {
  type:
    | typeof SAVE_ACTIVITY_FAILURE
    | typeof LEARN_TECH_FAILURE
    | typeof GET_USER_DATA_FAILURE
    | typeof NEW_GAME_FAILURE;

  error: Error | string;
}

// action types

const SAVE_ACTIVITY_REQUEST = 'SAVE_ACTIVITY_REQUEST';
const SAVE_ACTIVITY_SUCCESS = 'SAVE_ACTIVITY_SUCCESS';
const SAVE_ACTIVITY_FAILURE = 'SAVE_ACTIVITY_FAILURE';

const LEARN_TECH_REQUEST = 'LEARN_TECH_REQUEST';
const LEARN_TECH_SUCCESS = 'LEARN_TECH_SUCCESS';
const LEARN_TECH_FAILURE = 'LEARN_TECH_FAILURE';

const SET_POINTS_TO_ASSIGN = 'SET_POINTS_TO_ASSIGN';
const DECREASE_POINTS_TO_ASSIGN = 'DECREASE_POINTS_TO_ASSIGN';

const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE';

const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE';
const NEW_GAME_REQUEST = 'NEW_GAME_REQUEST';
const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';

const RESET_ERROR = 'RESET_ERROR';
